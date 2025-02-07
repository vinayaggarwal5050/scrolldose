import { Box,  Chip, Typography } from "@mui/material";
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

const AllVideos = () => {
  const [loading, setloading] = useState(true);
  const [videoList, setVideoList] = useState<any>([]);
  const [msg, setMsg] = useState();
  const { cpData } = useCPData();

  const getFromServer = async() => {
    try {
      const res = await fetch(`${backendURL}/video?studioid=${cpData.studio[0].id}`);
      const jsonRes = await res.json();

      return jsonRes;
      
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {

    setloading(true);

    getFromServer()
    .then((response) => {
      console.log(response);
      setMsg(response?.msg);
      
      if(response.status) {
        setVideoList(response?.data);
      } 

      setloading(false);
    });


  }, [])

  if(loading) {
    return (
      <>
        Videos are Loading....
      </>
    )
  }

  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
    <Box sx={{ m: 3, pb: 2, width: "100%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>

      { (videoList?.length === 0)  && 
        <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          No Video Available!!!
      </Typography>
      }

      { (videoList?.length > 0)  &&
      <Box>
        <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          All Videos
        </Typography>

        <Box sx={{ m: 2 }} >
          <RenderVideo videoList={videoList} />
        </Box>


      </Box>
      }

    </Box>
    </Box>

  )
}

export default AllVideos;

const RenderVideo = ({videoList} : any) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 370 }} aria-label="simple table">

        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight: "bold"}}>Title </TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="left" >Slug</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="left">Category</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="left">Tags</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="left">Status</TableCell>
            <TableCell sx={{fontWeight: "bold"}} align="left">Edit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {videoList.map((video : any) => (
            <TableRow
              key={video?.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {video?.title}
              </TableCell>
              <TableCell align="left">{video?.slug}</TableCell>
              <TableCell align="left">{video?.category}</TableCell>
              <TableCell align="left">{video?.tags}</TableCell>
              <TableCell align="left">
                <Chip label={video.status} sx={{color: `${video.status === "Approved" ? "green": "red"}`}} />
              </TableCell>
              <TableCell align="center"  onClick={() => { console.log(video?.id) }}><CreateIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>


      </Table>
    </TableContainer>
  )
}


