import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useCPData } from "../../global-states/CPProvider";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { backendURL } from "../../constants/backend-url";
import { Link } from "react-router-dom";

const AddVideo = () => {

  const { cpData } = useCPData();
  const [exists, setExists] = useState(false);
  const [msg, setMsg] = useState("");
  const [studioExists, setStdioExists] = useState(false);
  const [videoData, setVideoData] = useState<any>();


  useEffect(() => {
    if(cpData.studio.length > 0) {
      setStdioExists(true);
    }
  }, [])

  // if(!studioExists) {
  //   return 


  //     <Card sx={{ boxShadow: 3, width: "350px", height: "300px"}}>
  //       <CardContent>
  //         <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>

  //           <Typography variant="h5" >
  //             You need to create the Studio before you add any Video
  //           </Typography>

  //           <Box sx={{width: 200, height: 80, pt: 3}}>
  //             {/* <Button color="inherit" component={Link} to="cp/settings/studio-settings">
  //               Create Studio
  //             </Button> */}
  //           </Box>

  //         </Box>

  //       </CardContent>
  //     </Card>
      
  // }
  

  const validationSchema = Yup.object({
    title: Yup.string().required("Video Title is required"),
    slug: Yup.string().required("Video Slug is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags is required"),
    studioId: Yup.number().required("Channel Id is required"),
  });


  const handleSubmit = async(values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("studioId", values.studioId);

    const formDataObject: Record<string, any> = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });  

    console.log("Converted Object:", formDataObject);

    let response;

    if(exists) {
      response = await updateOnServer(formDataObject);
    } else {
      setExists(false);
      response = await createOnServer(formDataObject);
    }

    //server response is true
    if(response.data) {
      setExists(true);
      setVideoData(response.data);
      console.log(response.data);
    }

  }


  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      category: "",
      tags: "",
      studioId: cpData?.studio[0]?.id || "",
    },
    validationSchema,
    onSubmit: handleSubmit
  });


  const createOnServer = async(formData: any) => {
    try {
      const jsonRes = await fetch(`${backendURL}/video/upload?studioid=${cpData?.studio[0]?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const res = await jsonRes.json();
      console.log(res);

      if (res.status) {
        setMsg(res.msg);
      } else {
        setMsg(res.msg);
      }

      return res;

    } catch(err) {
      console.log(err);
    }

  }

  const updateOnServer = async(formData: any) => {
    try {
      const jsonRes = await fetch(`${backendURL}/video/update?videoid=${videoData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const res = await jsonRes.json();
      console.log(res);

      if (res.status) {
        setMsg(res.msg);
      } else {
        setMsg(res.msg);
      }

      return res.data;

    } catch(err) {
      console.log(err);
    }

  }



  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
      <Box sx={{ m: 3, pb: 2, width: "80%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>


        
        <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
        { exists ?  <>Edit Video Information</>: <>Upload New Video</>}
        </Typography>
        

        <Box sx={{ pl:6, pr: 6, mt: 1}}>
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

              {/* slug */}
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

              {/* category */}
              <TextField
                fullWidth
                margin="normal"
                label="Video Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                // helperText={formik.touched.link && formik.errors.link}
                size="small"
              />

              {/* category */}
              <TextField
                fullWidth
                margin="normal"
                label="Video Tags - Comma Separated"
                name="tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                // helperText={formik.touched.link && formik.errors.link}
                size="small"
              />

              {/* Main Image */}
              <Typography sx={{ mt: 2, mb: 1, color: 'text.primary', fontSize: 15 }}>
                Choose Video File To Upload
              </Typography>
              <input type="file" accept="video/*" onChange={() => {}} />


              {/* Submit Button */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {exists ? <>Edit Video Information</> : <>Upload Video</>}
                </Button>

            </form>

            <Typography sx={{ mt: 2, color: "gray" }}>{msg}</Typography>

          </Box>

      </Box>
    </Box>
  )
}

export default AddVideo;