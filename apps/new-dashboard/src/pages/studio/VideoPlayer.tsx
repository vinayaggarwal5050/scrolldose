import { Box, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';

const VideoPlayer = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoUrl = params.get('url');

  return (
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
      <Box sx={{ m: 3, pb: 2, width: "100%", height: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>

        <Typography sx={{ mt: 2, ml: 3, color: 'text.primary', fontWeight: "bold", fontSize: 18 }}>
          Video Player
        </Typography>

        <Box sx={{ pl: 6, pr: 6, mt: 1 }}>
          {videoUrl}
        </Box>
      </Box>
    </Box>
  )
}

export default VideoPlayer;