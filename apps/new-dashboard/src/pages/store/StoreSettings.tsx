import { Box, Button, TextField, Typography } from "@mui/material";
import { useCPData } from "../../global-states/CPProvider";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { backendURL } from "../../constants/backend-url";

const StoreSettings = () => {

  const { cpData, setCpData } = useCPData();
  const [exists, setExists] = useState(true);
  const [msg, setMsg] = useState("");
  
  useEffect(() => {
    if(cpData.store.length === 0) {
      setExists(false);
    }
  }, [])


  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    slug: Yup.string().required("Slug is required"),
    channelPartnerId: Yup.number().required("Description is required"),
  });


  const handleSubmit = async(values: any) => {
    setExists(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("slug", values.slug);
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
      setCpData(prev => ({...prev, store: [data]}))
    }
  }


  const formik = useFormik({
    initialValues: {
      name: cpData?.store[0]?.name || "",
      slug: cpData?.store[0]?.slug || "",
      channelPartnerId: cpData.id
    },
    validationSchema,
    onSubmit: handleSubmit
  });


  const createOnServer = async(formData: any) => {
    try {
      const jsonRes = await fetch(`${backendURL}/store/create?channelpartnerid=${cpData.id}`, {
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
      const jsonRes = await fetch(`${backendURL}/store/update?storeid=${cpData.store[0].id}`, {
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

        {(cpData.store.length > 0) &&
          <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          Update Store
        </Typography>
        }

        {(cpData.store.length === 0) &&
          <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          Add New Store
        </Typography>
        }

        <Box sx={{ pl:6, pr: 6, mt: 1}}>
            <form onSubmit={formik.handleSubmit}>

              {/* Name */}
              <TextField
                fullWidth
                margin="normal"
                label="Store Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                // helperText={formik.touched.name && formik.errors.name}
                size="small"
              />

              {/* Slug */}
              <TextField
                fullWidth
                margin="normal"
                label="Store Slug"
                name="slug"
                value={formik.values.slug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.slug && Boolean(formik.errors.slug)}
                // helperText={formik.touched.slug && formik.errors.slug}
                size="small"
              />

              {/* Submit Button */}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {exists ? <>Update Store</>: <>Create Store</>}
                </Button>

            </form>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {console.log(cpData)}}
              >
              Print State
            </Button>

            <Typography sx={{ mt: 2, color: "gray" }}>{msg}</Typography>

          </Box>

      </Box>
    </Box>
  )
}

export default StoreSettings;