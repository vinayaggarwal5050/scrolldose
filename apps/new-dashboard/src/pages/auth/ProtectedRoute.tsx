import { Outlet, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";


const ProtectedRoute = () => {
  const token = localStorage.getItem("cpJWT"); // Check if token exists

  // return token ? <Outlet /> : <Navigate to="/signin" />;
  return token ? <Outlet /> : <Redirector />;
};


const Redirector = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      navigate("/signin");
    }, 1000)
  })


    return(
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "90vw", height: "90vh"}}>
        <Card sx={{ boxShadow: 3, width: "350px", height: "100px"}}>
          <CardContent>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                  <Typography sx={{fontSize: "14", mt: 3}}>
                    Not Signed in, Redirecting to Signin page
                  </Typography>
            </Box>
          </CardContent>
        </Card>
        
      </Box>
    )

}


export default ProtectedRoute;




