import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Page404 = () => {

  return(
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "90vw", height: "90vh"}}>
      <Card sx={{ boxShadow: 3, width: "350px", height: "300px"}}>
        <CardContent>
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Box sx={{width: 200, height: 80, pt: 3}}>
              <Button color="inherit" component={Link} to="/signin">
                Back to Home Page
              </Button>
              </Box>
            <Typography variant="h5" >
              Error: 404 
            </Typography>
            <Typography variant="h5" >
              Page Does not exists
            </Typography>
          </Box>

        </CardContent>
      </Card>
      
    </Box>
  )
}

export default Page404;