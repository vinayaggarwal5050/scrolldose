import { Box,  Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { backendURL } from "../../constants/backend-url";
import { useCPData } from "../../global-states/CPProvider";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";


const AllCategories = () => {

  const { cpData } = useCPData();
  const [loading, setloading] = useState(true);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [msg, setMsg] = useState<any>();
  const [resAwait, setResAwait] = useState(false);

  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState<boolean>(false);
  const [selectedCategoryData, setSelectedCategoryData] = useState<any>();


  useEffect(() => {

    const storeId = cpData.store[0]?.id;

    try {
      fetch(`${backendURL}/category?storeid=${storeId}`)
      .then(res => {

        if(!res.ok) {
          setMsg("Unable to reach server");
          setloading(false);
          return;
        } else {
          return res.json();
        }

      })
      .then(jsonRes => {

        console.log(jsonRes);
        if(jsonRes.status) {
          setCategoryList(jsonRes.data);
        }
        setMsg(jsonRes.msg);
        setloading(false);

      })

    } catch(err) {
      setMsg("Some Unexpected Error Occured");
    }

  }, [])

  if(loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  const handleDeleteButton = async(categoryId: number) => {

    setResAwait(true);
    setMsg(null);
    const response = await deleteOnServer(categoryId);

    setResAwait(false);
    setMsg(response?.msg);

    if(response?.status) {
      setCategoryList((prevCategoryList: any) => (
        prevCategoryList.filter((category:any) => category.id !== categoryId)
      ))
    }

  }

  const handleEditButton = (categoryData: any) => {
    setSelectedCategoryData(categoryData);
    setShowUpdateCategory(true);
  }

  const deleteOnServer = async(categoryId: number) => {
    try {
      const res = await fetch(`${backendURL}/category/delete?categoryid=${categoryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const jsonRes = await res.json();
      return jsonRes;

    } catch(err) {
      console.log(err);
    }

  }


  return (
  <Box sx={{ miWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
    <Box sx={{ m: 3, pb: 2, width: "80%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>
      <Typography sx={{ mt: 3, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
        Categories
      </Typography>

      <Typography sx={{ m: 3, color: "gray", fontSize: 14 }}>{msg}</Typography>

      {/* {Add Category Button} */}
      {!showAddCategory && !showUpdateCategory &&
        <Box sx={{m: 3}}>
          <Button  variant="contained" color="primary" onClick={() => setShowAddCategory(true)}>Add Category</Button>
        </Box>
      }

      {/* {Add Category Form} */}
      {showAddCategory &&
        <Box sx={{m: 3, width: "80%"}} >
          <AddCategory setShowAddCategory={setShowAddCategory} setMsg={setMsg} setCategoryList={setCategoryList}  />
        </Box>
      }

      {/* {Update Category Form} */}
        {showUpdateCategory &&
        <Box sx={{m: 3, width: "80%"}} >
          <UpdateCategory setShowUpdateCategory={setShowUpdateCategory} setMsg={setMsg} setCategoryList={setCategoryList} selectedCategoryData={selectedCategoryData} /> 
        </Box>
      }

      {/* {TABLE} */}
      <Box sx={{m: 3, width: "80%"}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 370 }} aria-label="simple table">

            <TableHead>
              <TableRow >
                <TableCell sx={{fontWeight: "bold"}} align="left" >Name</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="left" >Slug</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="left" >Edit</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="left" >Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categoryList.map((category : any) => (
                <TableRow
                  key={category?.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell align="left">{category?.name}</TableCell>
                  <TableCell align="left">{category?.slug}</TableCell>
                  <TableCell align="left"  onClick={() => handleEditButton(category)}>
                    <Button color="inherit">
                      <CreateIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left"  onClick={() => handleDeleteButton(category?.id)}>
                    <Button color="inherit">
                      <Box sx={{ display: "flex" }}>
                        <DeleteSweepOutlinedIcon />
                        {resAwait &&
                        <CircularProgress/>
                        }
                      </Box>
                    </Button>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>


          </Table>
        </TableContainer>
      </Box>



    </Box>
  </Box>
  )
}

export default AllCategories;