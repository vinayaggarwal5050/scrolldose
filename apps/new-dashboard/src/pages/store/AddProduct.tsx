import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Box, Radio, FormLabel, RadioGroup, FormControlLabel, CircularProgress } from "@mui/material";
import { useCPData } from "../../global-states/CPProvider";
import { backendURL } from "../../constants/backend-url";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProduct = () => {

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<any>();
  const [resAwait, setResAwait] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);



  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [otherImages, setOtherImages] = useState<File[] | null>(null);
  const [otherImagesPreview, setOtherImagesPreview] = useState<string[]>([]);

  const [categoryList, setCategoryList] = useState<any>();
  const [videoList, setVideoList] = useState<any>();
  const [globalSubCategoryList, setGlobalSubCategoryList] = useState<any>();

  const { cpData } = useCPData();
  const storeId = cpData.store[0]?.id;
  const studioId = cpData.studio[0]?.id;

  const getCategoriesFromServer = async() => {
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

  const getVideosFromServer = async() => {
    try {
      const res = await fetch(`${backendURL}/video?studioid=${studioId}`);
      const response = await res.json();

      if(response?.status) {
        setVideoList(response?.data);
      } else {
        setVideoList(null);
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
        setVideoList(null);
      }

    } catch(error) {
      console.log(error);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().positive().required("Price is required"),

    categoryId: Yup.number().required("Category Id is required"),
    globalSubCategoryId: Yup.number().required("Category Id is required"),
    videoUrl: Yup.string().optional(),
    videoId: Yup.number().required("videoId is required"),

    tags:  Yup.string().optional(),
    stock: Yup.number().integer().min(0).optional(),

    isAffiliateLink : Yup.boolean().required("Is this affiliate product?"),
    affiliateLink: Yup.string().optional(),
    affiliateHost: Yup.string().optional(),
    affiliateImageLink: Yup.string().optional(),
  });

  const handleSubmit = async(values: any) => {

    setResAwait(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("slug", values.slug);
    formData.append("description", values.description);
    formData.append("price", values.price);

    formData.append("categoryId", values.categoryId);
    formData.append("globalSubCategoryId", values.globalSubCategoryId);
    formData.append("videoUrl", values.videoUrl);
    formData.append("videoId", values.videoId);

    formData.append("tags", values.tags);
    formData.append("stock", values.stock);

    formData.append("isAffiliateLink", String(values.isAffiliateLink));
    formData.append("affiliateLink", values.affiliateLink);
    formData.append("affiliateHost", values.affiliateHost);
    formData.append("affiliateImageLink", values.affiliateImageLink);
    formData.append("mainImage", mainImage || "image_not_find");

    if (otherImages && otherImages.length > 0) {
      otherImages.forEach((image: File) => {
        formData.append("otherImages", image);
      });
    }

    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log("Converted Object:", formDataObject);

    const response = await createOnServer(formData);
    setResAwait(false);
    setMsg(response?.msg);

    if(response.status) {
      setSubmitSuccess(true);
    } else {
      setSubmitSuccess(false);
    }
    

  };

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
      price: null,
  
      categoryId: "",
      globalSubCategoryId: "",
      videoUrl: "",
      videoId: "",
  
      tags:  "",
      stock: null,
  
      isAffiliateLink : false,
      affiliateLink: "",
      affiliateHost: "",
      affiliateImageLink: "",
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file)); 
    }
  };


  const handleOtherImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setOtherImages(filesArray);
      setOtherImagesPreview(filesArray.map((file) => URL.createObjectURL(file))); 
    }
  };

  useEffect(() => {

    const fetchFromServer = async () => {
      setLoading(true);
      await getCategoriesFromServer();
      await getVideosFromServer();
      await getGlobalSubCategories();
      setLoading(false);
    }

    fetchFromServer();

  }, [])

  if(loading) {
    return (
      <Box sx={{ minWidth: "50vh", minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress/>
      </Box>
    )
  }

  const createOnServer = async(formData: any) => {
    try {
      const res = await fetch(`${backendURL}/product/upload`, {
        method: "POST",
        body: formData,
      });
      const jsonRes = await res.json();
      return jsonRes;

    } catch(err) {
      console.log(err);
    }

  }

  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
      <Box sx={{ m: 3, pb: 2, width: "60%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>
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
                disabled={submitSuccess && !allowEdit}
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
                disabled={submitSuccess && !allowEdit}
              />

              {/* Category Id */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Category Id</InputLabel>
                <Select
                  name="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                  disabled={submitSuccess && !allowEdit}       
                >
                  {categoryList.map((category: any) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Global Sub Category */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Global Sub Category</InputLabel>
                <Select
                  name="globalSubCategoryId"
                  value={formik.values.globalSubCategoryId}
                  onChange={formik.handleChange}
                  error={formik.touched.globalSubCategoryId && Boolean(formik.errors.globalSubCategoryId)}
                  disabled={submitSuccess && !allowEdit}
                >
                  {globalSubCategoryList.map((category: any) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Video Id */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Video Id</InputLabel>
                <Select
                  name="videoId"
                  value={formik.values.videoId}
                  onChange={formik.handleChange}
                  error={formik.touched.videoId && Boolean(formik.errors.videoId)}
                  disabled={submitSuccess && !allowEdit}
                >
                  {videoList.map((video: any) => (
                    <MenuItem key={video.id} value={video.id}>
                      {video.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                disabled={submitSuccess && !allowEdit}
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
                disabled={submitSuccess && !allowEdit}
              />

              {/* Video Url */}
              <TextField
                fullWidth
                margin="normal"
                label="Video URL"
                name="videoUrl"
                value={formik.values.videoUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
                helperText={formik.touched.videoUrl && formik.errors.videoUrl}
                size="small"
                disabled={submitSuccess && !allowEdit}
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
                disabled={submitSuccess && !allowEdit}
              />

              {/* Tags */}
              <TextField
                fullWidth
                margin="normal"
                label="Tags (Separated By Comma)"
                name="tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
                size="small"
                disabled={submitSuccess && !allowEdit}
              />

              {/* {Is Affiliate} */}
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Is Affiliate Product?</FormLabel>
                <RadioGroup
                  row
                  name="isAffiliateLink"
                  value={formik.values.isAffiliateLink.toString()}
                  onChange={(event) => formik.setFieldValue("isAffiliateLink", event.target.value === "true")}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              {/* {Affiliate Link} */}
              <TextField
                fullWidth
                margin="normal"
                label="Affiliate Product Link "
                name="affiliateLink"
                value={formik.values.affiliateLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.affiliateLink && Boolean(formik.errors.affiliateLink)}
                helperText={formik.touched.affiliateLink && formik.errors.affiliateLink}
                size="small"
                disabled={submitSuccess && !allowEdit}
              />

              {/* {Affiliate Image} */}
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
                disabled={submitSuccess && !allowEdit}
              />

              {/* {Affiliate Host} */}
              <TextField
                fullWidth
                margin="normal"
                label="Affiliate Host (Amazon, Flipkart) "
                name="affiliateHost"
                value={formik.values.affiliateHost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.affiliateHost && Boolean(formik.errors.affiliateHost)}
                helperText={formik.touched.affiliateHost && formik.errors.affiliateHost}
                size="small"
                disabled={submitSuccess && !allowEdit}
              />

              {/* Main Image */}
              <Typography sx={{ mt: 2, mb: 1, color: 'text.primary', fontSize: 15 }}>
                Main Image
              </Typography>
              <input type="file" accept="image/*" onChange={handleMainImageChange} />
              {mainImagePreview && (
                <Box sx={{ mt: 1 }}>
                  <img src={mainImagePreview} alt="Main Preview" width="100px" height="100px" style={{ borderRadius: '5px', objectFit: 'cover' }} />
                </Box>
              )}

              {/* Other Images */}
              <Typography sx={{ mt: 2, mb:1, color: 'text.primary', fontSize: 15 }}>
                Other Images
              </Typography>
              <input type="file" accept="image/*" multiple onChange={handleOtherImagesChange} />
              <div style={{ display: "flex", gap: "10px", marginTop: 8 }}>
              {otherImagesPreview.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index + 1}`} width="100" />
              ))}
            </div>

              { resAwait && <CircularProgress/> }

              { !submitSuccess && !allowEdit &&
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={resAwait}
                  sx={{ mt: 2 }}
                >
                  Submit Product
                </Button>
                
              }

              { allowEdit &&
                <Box sx={{mt: 2}}>
                  <Button  variant="contained" color="primary" sx={{ mr: 2 }} disabled={resAwait} >Update</Button>
                  <Button  variant="contained" color="inherit" onClick={() => setAllowEdit(false)} disabled={resAwait} >Cancel</Button>
              </Box>
              }

              { submitSuccess && !allowEdit &&
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={resAwait}
                  sx={{ mt: 2 }}
                  onClick={() => setAllowEdit(true)}
                >
                  Edit Product
                </Button>
              }            

            <Typography sx={{ mt: 2, color: "gray", fontSize: 14 }}>{msg}</Typography>

          </form>
        </Box>

              
      </Box>
    </Box>
  )
}

export default AddProduct;