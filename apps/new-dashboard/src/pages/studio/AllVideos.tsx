import { Box,  Button,  Chip, CircularProgress, TextField, Typography } from "@mui/material";
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

import { useFormik } from "formik";
import * as Yup from "yup";


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
      // console.log(response);
      setMsg(response?.msg);
      
      if(response.status) {
        setVideoList(response?.data);
      } 

      setloading(false);
    });


  }, [])

  if(loading) {
    return (
      <Box sx={{m: 5}}>
       <CircularProgress/>
      </Box>
    )
  }




  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
    <Box sx={{ m: 3, pb: 2, width: "100%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>

      { (videoList?.length === 0)  && 
        <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          No Video Available!!!
          {msg}
      </Typography>
      
      }

      { (videoList?.length > 0)  &&
      <Box>
        <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          All Videos
        </Typography>

        <Box sx={{ m: 2 }} >
          <RenderVideoList videoList={videoList}  />
        </Box>


      </Box>
      }

    </Box>
    </Box>

  )
}

export default AllVideos;


const RenderVideoList = ({videoList} : any) => {

  const [showForm, setShowForm] = useState(false);
  const [resAwait, setResAwait] = useState(false);
  const [msg, setMsg] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string().required("Video Title is required"),
    slug: Yup.string().required("Video Slug is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
    videoId: Yup.number().required("Tags are required"),
  });


  const handleSubmitForm = async (values: any) => {
    setResAwait(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("category", values.category);
    formData.append("tags", values.tags);

    const videoId = values.videoId;

    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log("Converted Object:", formDataObject);
    console.log(videoId);

    const response = await updateOnServer(formDataObject, videoId);
    setMsg(response?.msg);

    if(response?.status) {

    }
    setResAwait(false);
    
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      category: "",
      tags: "",
      videoId: 0
    },
    validationSchema,
    onSubmit: handleSubmitForm,
  });

  const handleEdit = (video: any) => {
    console.log(video);
    setShowForm(true);

    formik.setValues({
      title: video.title,
      slug: video.slug,
      category: video.category,
      tags: video.tags,
      videoId: video.id
    });


  }


  const updateOnServer = async (formData: any, videoId: any) => {
    try {
      const res = await fetch(`${backendURL}/video/update?videoid=${videoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const jsonRes = await res.json();
      return jsonRes;
    } catch (err) {
      console.error(err);
    }
  };


  return (
  <Box>
    {showForm &&
    <Box>
      <form onSubmit={formik.handleSubmit}>
            {/* Title */}
            <TextField
              fullWidth
              margin="normal"
              label="Video Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              size="small"
            />

            {/* Slug */}
            <TextField
              fullWidth
              margin="normal"
              label="Video Slug"
              name="slug"
              value={formik.values.slug}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.slug && Boolean(formik.errors.slug)}
              size="small"
            />

            {/* Category */}
            <TextField
              fullWidth
              margin="normal"
              label="Video Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              size="small"
            />

            {/* Tags */}
            <TextField
              fullWidth
              margin="normal"
              label="Video Tags - Comma Separated"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tags && Boolean(formik.errors.tags)}
              size="small"
            />

            {resAwait  && <CircularProgress />}

            {/* Submit Button */}
            <Box sx={{mt: 2}}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }} disabled={resAwait} >Update</Button>
              <Button  variant="contained" color="inherit" onClick={() => setShowForm(false)}>Cancel</Button>
            </Box>

            <Typography sx={{ mt: 2, color: "gray" }}>{msg}</Typography>

          </form>
    </Box>
    }

    <Box sx={{mt: 2}}>
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
                <TableCell align="center"  onClick={() => handleEdit(video) }><CreateIcon /></TableCell>
              </TableRow>
            ))}
          </TableBody>


        </Table>
      </TableContainer>
    </Box>
  </Box>

  )
}


