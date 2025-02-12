import { Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";

// import CreateIcon from '@mui/icons-material/Create';
// import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

const AllProducts = () => {


  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState<any>([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const [globalSubCategoryList, setGlobalSubCategoryList] = useState<any>();

  const { cpData } = useCPData();
  const navigate = useNavigate();


  const getCategoriesFromServer = async(storeId: number) => {
    try {
      const res = await fetch(`${backendURL}/category?storeid=${storeId}`);
      const response = await res.json();

      if(response?.status) {
        setCategoryList(response?.data);
      } else {
        setCategoryList(null);
      }

    } catch(error) {
      console.log(error);
    }
  }

  const getProductsFromServer = async(storeId: number) => {
    try {
      const res = await fetch(`${backendURL}/product?storeid=${storeId}`);
      const response = await res.json();

      if(response?.status) {
        setProductList(response?.data);
      } else {
        setCategoryList(null);
      }

    } catch(error) {
      console.log(error);
    }
  }

  const getGlobalSubCategories = async() => {
    try {
      const res = await fetch(`${backendURL}/global-sub-category`);
      const response = await res.json();

      if(response?.status) {
        setGlobalSubCategoryList(response?.data);
      } else {
        setGlobalSubCategoryList(null);
      }

    } catch(error) {
      console.log(error);
    }
  }



  useEffect(() => {

    const storeId = cpData.store[0]?.id;

    const fetchFromServer = async () => {
      setLoading(true);
      await getCategoriesFromServer(storeId);
      await getProductsFromServer(storeId);
      await getGlobalSubCategories();
      setLoading(false);
    }

    fetchFromServer();

  }, [])

  if(loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }


  return (
    <Box sx={{ miWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
      <Box sx={{ m: 3, pb: 2, width: "90%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>

        <Typography sx={{ mt: 3, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          All Products
        </Typography>


      {/* {TABLE} */}
      <Box sx={{m: 3, width: "90%"}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 370 }} aria-label="simple table">

            <TableHead>
              <TableRow >
                <TableCell sx={{fontWeight: "bold"}} align="left" >Name</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="left" >Category</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="left" >GSC</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="left" >Price</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="left" >Affliate?</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productList.map((product : any) => (
                <TableRow
                  key={product?.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell align="left" >
                    <Button color="primary" onClick={() => navigate(`/cp/store/product?slug=${product?.slug}`)} >
                      {product?.name}
                    </Button>
                  </TableCell>
                  <TableCell align="left">{categoryList.filter( (category: any) => category.id === product?.categoryId)[0].name}</TableCell>
                  <TableCell align="left">{globalSubCategoryList.filter( (gsc: any) => gsc.id === product?.globalSubCategoryId)[0].name}</TableCell>
                  <TableCell align="left">{product?.price}</TableCell>
                  <TableCell align="left" >
                    {(product?.isAffiliateLink) ? 
                      <a href={product?.affiliateLink} style={{textDecoration: "none"}} color="primary" target="_blank">
                        <Chip label={product?.affiliateHost} sx={{ color: "green" }}  />
                      </a> 
                       : 
                      <>No</>}
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

export default AllProducts;