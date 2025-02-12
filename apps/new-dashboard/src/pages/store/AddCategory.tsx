import { Box,  Button, CircularProgress, TextField } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { backendURL } from "../../constants/backend-url";
import { useCPData } from "../../global-states/CPProvider";

const AddCategory = ({ setShowAddCategory, setMsg, setCategoryList }: any) => {

  const { cpData } = useCPData();  
  const [resAwait, setResAwait] = useState(false);
  const [sumbitSuccess, setSubmitSuccess] = useState(false);

  const storeId = cpData.store[0]?.id;

  const validationSchema = Yup.object({
    name: Yup.string().required("Category Name is required"),
    slug: Yup.string().required("Category Slug is required"),
  });

  const handleSubmitForm = async (values: any) => {

    setResAwait(true);
    setMsg(null);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("slug", values.slug);

    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log("Converted Object:", formDataObject);

    const response = await createOnServer(formDataObject, storeId);
    setResAwait(false);
    setMsg(response?.msg);

    if(response?.status) {
      setSubmitSuccess(true);
      setShowAddCategory(false);
      setCategoryList((list: any) => (
        [...list, response?.data]
      ))

    } else {
      setSubmitSuccess(false);
    }
    
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema,
    onSubmit: handleSubmitForm,
  });

  const createOnServer = async(formData: any, storeId: number) => {
    try {
      const res = await fetch(`${backendURL}/category/create?storeid=${storeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonRes = await res.json();
      return jsonRes;

    } catch(err) {
      console.log(err);
    }

  }

  return(
    <Box sx={{width: "80%"}}>
      <form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <TextField
          fullWidth
          margin="normal"
          label="Category Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          size="small"
        />

        {/* Title */}
        <TextField
          fullWidth
          margin="normal"
          label="Category Slug"
          name="slug"
          value={formik.values.slug}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.slug && Boolean(formik.errors.slug)}
          size="small"
        />
        {resAwait  && <CircularProgress />}

        {/* Submit Button */}
        { !sumbitSuccess &&
          <Box sx={{mt: 2}}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }} disabled={resAwait} >Submit</Button>
            <Button  variant="contained" color="inherit" onClick={() => setShowAddCategory(false)} disabled={resAwait} >Cancel</Button>
          </Box>
        }

      </form>    
    </Box>
  )
}

export default AddCategory;