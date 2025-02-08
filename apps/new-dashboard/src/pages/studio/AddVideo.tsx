import { Box, Button, TextField, Typography, CircularProgress, IconButton } from "@mui/material";
import { useCPData } from "../../global-states/CPProvider";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { backendURL } from "../../constants/backend-url";
import CloseIcon from "@mui/icons-material/Close";

const AddVideo = () => {
  const { cpData } = useCPData();
  const [exists, setExists] = useState(false);
  const [msg, setMsg] = useState("");
  const [studioExists, setStudioExists] = useState(false);
  const [videoData, setVideoData] = useState<any>();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(studioExists);
    if (cpData.studio.length > 0) {
      setStudioExists(true);
    }
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("Video Title is required"),
    slug: Yup.string().required("Video Slug is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
    studioId: Yup.number().required("Channel Id is required"),
  });

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  // Remove Selected File
  const removeSelectedFile = () => {
    setVideoFile(null);
  };

  // Handle Form Submission
  const handleSubmit = async (values: any) => {
    if (!videoFile) {
      setMsg("Please select a video file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("studioId", values.studioId);
    formData.append("video", videoFile);

    setLoading(true);

    let response;
    if (exists) {
      response = await updateOnServer(formData);
    } else {
      response = await createOnServer(formData);
    }

    console.log(response);

    setLoading(false);

    if (response?.data) {
      setExists(true);
      setVideoData(response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      category: "",
      tags: "",
      studioId: cpData?.studio[0]?.id || "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // API Calls
  const createOnServer = async (formData: FormData) => {
    try {
      const response = await fetch(`${backendURL}/video2/upload?studioid=${cpData?.studio[0]?.id}`, {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      setMsg(res.msg);
      return res;
    } catch (err) {
      console.error(err);
      setMsg("Error uploading video.");
    }
  };

  const updateOnServer = async (formData: FormData) => {
    try {
      const response = await fetch(`${backendURL}/video/update?videoid=${videoData?.id}`, {
        method: "PUT",
        body: formData,
      });

      const res = await response.json();
      setMsg(res.msg);
      return res;
    } catch (err) {
      console.error(err);
      setMsg("Error updating video.");
    }
  };

  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center" }}>
      <Box sx={{ m: 3, pb: 2, width: "80%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>
        <Typography sx={{ mt: 2, ml: 3, color: "text.primary", fontWeight: "bold", fontSize: 18 }}>
          {exists ? "Edit Video Information" : "Upload New Video"}
        </Typography>

        <Box sx={{ pl: 6, pr: 6, mt: 1 }}>
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

            {/* Upload Video */}
            <Typography sx={{ mt: 2, mb: 1, color: "text.primary", fontSize: 15 }}>
              Choose a Video File (Only One)
            </Typography>

            {/* File Input */}
            {!videoFile ? (
              <input type="file" accept="video/*" onChange={handleFileChange} />
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 2 }}>
                <Typography sx={{ fontSize: 14, color: "gray", mr: 1 }}>{videoFile.name}</Typography>
                <IconButton onClick={removeSelectedFile} size="small">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}

            {/* Loading Indicator */}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? "Uploading..." : exists ? "Edit Video Information" : "Upload Video"}
            </Button>
          </form>

          {/* Error Message */}
          <Typography sx={{ mt: 2, color: "gray" }}>{msg}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddVideo;
