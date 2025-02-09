import { Box, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { vsLink } from "../../constants/video-server-link";

const VideoPlayer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoUrl = vsLink + params.get('url');

  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "start" }}>
      <Box sx={{ m: 3, pb: 2, width: "30%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>
        <Typography sx={{ m: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 10 }}>
          {videoUrl}
        </Typography>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {videoUrl && (
            <video
              controls
              style={{ width: "60%", borderRadius: "10px" }}
              src={videoUrl}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
