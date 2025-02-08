import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useCPData } from "../../global-states/CPProvider";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { backendURL } from "../../constants/backend-url";

const StudioSettings = () => {

  const { cpData, setCpData } = useCPData();
  const [exists, setExists] = useState(true);
  const [msg, setMsg] = useState("");
  const [resAwait, setResAwait] = useState(false);
  
  useEffect(() => {
    if(cpData.studio.length === 0) {
      setExists(false);
    }
  }, [])


  const validationSchema = Yup.object({
    name: Yup.string().required("Studio Name is required"),
    link: Yup.string().required("Link is required"),
    channelPartnerId: Yup.number().required("Channel Id is required"),
  });


  const handleSubmit = async(values: any) => {
    setExists(true);
    setResAwait(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("link", values.link);
    formData.append("channelPartnerId", values.channelPartnerId);

    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });  
    console.log("Converted Object:", formDataObject);

    let data;
    if(exists) {
      data = await updateOnServer(formDataObject);
    } else {
      data = await createOnServer(formDataObject);
    }

    //server response is true
    if(data) {
      //@ts-ignore
      setCpData(prev => ({...prev, studio: [data]}))
    }
    setResAwait(false);
  }


  const formik = useFormik({
    initialValues: {
      name: cpData?.studio[0]?.name || "",
      link: cpData?.studio[0]?.link || "",
      channelPartnerId: cpData.id
    },
    validationSchema,
    onSubmit: handleSubmit
  });


  const createOnServer = async(formData: any) => {
    try {
      const jsonRes = await fetch(`${backendURL}/studio/create?channelpartnerid=${cpData.id}`, {
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

      return res.data;

    } catch(err) {
      console.log(err);
    }

  }

  const updateOnServer = async(formData: any) => {
    try {
      const jsonRes = await fetch(`${backendURL}/studio/update?studioid=${cpData.studio[0].id}`, {
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

        {(cpData.studio.length > 0) &&
          <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          Update Studio
        </Typography>
        }

        {(cpData.studio.length === 0) &&
          <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          Add New Studio
        </Typography>
        }

        <Box sx={{ pl:6, pr: 6, mt: 1}}>
            <form onSubmit={formik.handleSubmit}>

              {/* Name */}
              <TextField
                fullWidth
                margin="normal"
                label="Studio Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                // helperText={formik.touched.name && formik.errors.name}
                size="small"
              />

              {/* link */}
              <TextField
                fullWidth
                margin="normal"
                label="Studio Link"
                name="link"
                value={formik.values.link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.link && Boolean(formik.errors.link)}
                // helperText={formik.touched.link && formik.errors.link}
                size="small"
              />

              {resAwait  && <CircularProgress />}

              {/* Submit Button */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={resAwait}
                  sx={{ mt: 2 }}
                >
                  {exists ? <>Update Studio</>: <>Create Studio</>}
                </Button>

                <Typography sx={{ mt: 2, color: "gray" }}>{msg}</Typography>

            </form>

          </Box>

      </Box>
    </Box>
  )
}

export default StudioSettings;