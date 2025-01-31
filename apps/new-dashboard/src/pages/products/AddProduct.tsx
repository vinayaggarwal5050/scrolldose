import React, { useState } from "react";
import { Button, TextField, Typography, Container, MenuItem, Select, InputLabel, FormControl, Box, Radio, FormLabel, RadioGroup, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const categories = ["Mixed", "Electronics", "Clothing", "Books", "Home & Kitchen"];
const videos = ["Astronaut Lamp", "Night Lamp", "Kid's Money Bank", "Electronics Sound Book", "Moon Lamp"];

export const AddProduct = () => {

  const [submitted, setSubmitted] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<File[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const backendURL = "http://backend.scrolldose.com/api/v1";
  const cpJWT = "sadfasdfjaljowieru9euernweoirw9e8y";

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().positive().required("Price is required"),
    category: Yup.string().required("Category is required"),
    video: Yup.string().required("video is required"),
    tag:  Yup.string().optional(),
    stock: Yup.number().integer().min(0).optional(),
    isAffiliate : Yup.boolean().required("Is this affiliate product?"),
    affiliateLink: Yup.string().optional(),
    affiliateImageLink: Yup.string().optional(),
  });

  const pushToServer = async (data: any) => {
    try {
      const res = await fetch(`http://${backendURL}/product/create`, {
        method: "POST",
        headers: {
          "contentType": "Application/Json",
          "Authentication": `Auth-bearer: ${cpJWT}`
        },
        body: JSON.stringify(data)
      });

      if(res.ok) {
        setSubmitted(true);
        alert("product addred successfully");
        const jsonData = await res.json();
        return jsonData;
      } else {
        alert("Could not add product");
        return null;
      }

    } catch(err) {
      return null;
    }
  }

  const handleSubmit = async(values: any) => {
    setSubmitted(true);
    console.log("handle Submit")
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("slug", values.slug);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("isAffiliate", String(values.isAffiliate));
    formData.append("affiliateLink", values.affiliateLink);
    formData.append("affiliateImageLink", values.affiliateImageLink);
    formData.append("video", values.video);
    formData.append("tag", values.tag);
    formData.append("stock", values.stock);

    // console.log(formData);
    formData.forEach((item, key) => console.log(key, item));
    const jsonData = await pushToServer(formData);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      slug: "",
      video: "",
      tag: "",
      stock: "",
      isAffiliate: true,
      affiliateLink: "",
      affiliateImageLink: ""
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setMainImage(event.target.files[0]);
  };

  const handleOtherImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setOtherImages([...event.target.files]);
  };

  return(
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
      <Box sx={{ m: 3, pb: 2, width: "100%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>
        <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          Add New Product
        </Typography>

        <Box sx={{ pl:6, pr: 6, mt: 1}}>
            <form onSubmit={formik.handleSubmit}>

              {/* Name */}
              <TextField
                fullWidth
                margin="normal"
                label="Product Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                size="small"
              />

              {/* Slug */}
              <TextField
                fullWidth
                margin="normal"
                label="Slug"
                name="slug"
                value={formik.values.slug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.slug && Boolean(formik.errors.slug)}
                helperText={formik.touched.slug && formik.errors.slug}
                size="small"
              />

              {/* Description */}
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />

              {/* Price */}
              <TextField
                margin="normal"
                label="Price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />

              {/* Category */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Is Affiliate?</FormLabel>
              <RadioGroup
                row
                name="isAffiliate"
                value={formik.values.isAffiliate.toString()}
                onChange={(event) => formik.setFieldValue("isAffiliate", event.target.value === "true")}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>


              {/* affiliateLink */}
              <TextField
                fullWidth
                margin="normal"
                label="Affiliate Link"
                name="affiliateLink"
                value={formik.values.affiliateLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.affiliateLink && Boolean(formik.errors.affiliateLink)}
                helperText={formik.touched.affiliateLink && formik.errors.affiliateLink}
                size="small"
              />

              {/* affiliateImageLink */}
              <TextField
                fullWidth
                margin="normal"
                label="Affiliate Product Image Link "
                name="affiliateImageLink"
                value={formik.values.affiliateImageLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.affiliateImageLink && Boolean(formik.errors.affiliateImageLink)}
                helperText={formik.touched.affiliateImageLink && formik.errors.affiliateImageLink}
                size="small"
              />
              

              {/* Video */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Connect Video</InputLabel>
                <Select
                  name="video"
                  value={formik.values.video}
                  onChange={formik.handleChange}
                  error={formik.touched.video && Boolean(formik.errors.video)}
                >
                  {videos.map((video) => (
                    <MenuItem key={video} value={video}>
                      {video}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Tag */}
              <TextField
                fullWidth
                margin="normal"
                label="Tags (Separated By Comma)"
                name="tag"
                value={formik.values.tag}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tag && Boolean(formik.errors.tag)}
                helperText={formik.touched.tag && formik.errors.tag}
                size="small"
              />

              {/* Stock */}
              <TextField
                margin="normal"
                label="Stock"
                name="stock"
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
              />

              {/* Submit Button */}
              {! submitted && 
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit Product
                </Button>
              }

              { submitted &&
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Edit Product
                </Button>
              }


            </form>

          {/* </Container> */}

        </Box>
      </Box>
    </Box>
  )
}