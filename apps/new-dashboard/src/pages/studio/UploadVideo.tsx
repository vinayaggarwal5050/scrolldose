import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { backendURL } from "../../constants/backend-url";

const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a video file first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile); // Append file to FormData

    try {
      const res = await fetch(`${backendURL}/video2/upload`, {
        method: "POST",
        body: formData, // Send FormData (not JSON)
      });

      const jsonRes = await res.json();
      console.log(jsonRes);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Video upload failed.");
    }
  };

  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center" }}>
      <Box sx={{ m: 3, p: 2, width: "80%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>
        <Typography sx={{ mt: 2, mb: 1, color: "text.primary", fontSize: 15 }}>
          Choose Video File To Upload
        </Typography>

        <form onSubmit={handleSubmit}>
          <input type="file" accept="video/*" onChange={handleFileChange} />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Upload Video
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UploadVideo;
