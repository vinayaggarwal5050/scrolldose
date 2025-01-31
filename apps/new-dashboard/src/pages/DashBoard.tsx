import { Box, Card, CardContent, Typography } from "@mui/material";
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import FavoriteIcon from '@mui/icons-material/Favorite';


export const DashBoard = () => {

  return(
    <Box sx={{ minWidth: "80vh", minHeight: "85vh", display: "flex", justifyContent: "center"}}>
      <Box sx={{ m: 3, width: "100%", backgroundColor: "#ffffff", borderRadius: "10px" }}>
        <Box sx={{ p:2 }}>
          <Typography variant="h6">
            Admin Dash Board
          </Typography>
        </Box>

        <Box sx={{mt: 2, width: "100%", height: "200px", display: "flex", justifyContent: "space-evenly" }}>

          <Card variant="outlined" sx={{p:1, minWidth: 200, height: 100}}>
            <CardContent>
              <Box sx={{display: "flex"}}>
                <Box sx={{width: "70%"}}>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                    Total Sales
                  </Typography>
                  <Typography variant="h6">
                    $2,202
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'green', fontSize: 12 }}>
                    15% increase
                  </Typography>
                </Box >
                <Box sx={{width: "30%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <Box sx={{width: "50px", height: "50px", color: "blue", borderRadius: "25px", backgroundColor: "#E6F4FF", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <PaymentsIcon fontSize="large" />
                  </Box>
                </Box>

              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{p:1, minWidth: 200, height: 100}}>
            <CardContent>
              <Box sx={{display: "flex"}}>
                <Box sx={{width: "70%"}}>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                    Orders
                  </Typography>
                  <Typography variant="h6">
                    214
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'green', fontSize: 12 }}>
                    18% increase
                  </Typography>
                </Box >
                <Box sx={{width: "30%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <Box sx={{width: "50px", height: "50px", color: "green", borderRadius: "25px", backgroundColor: "lightgreen", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <LocalMallIcon fontSize="large" />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{p:1, minWidth: 200, height: 100}}>
            <CardContent>
              <Box sx={{display: "flex"}}>
                <Box sx={{width: "70%"}}>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                    Views
                  </Typography>
                  <Typography variant="h6">
                    381K
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'green', fontSize: 12 }}>
                    20% increase
                  </Typography>
                </Box >
                <Box sx={{width: "30%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <Box sx={{width: "50px", height: "50px", color: "#A259FF", borderRadius: "25px", backgroundColor: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <SubscriptionsIcon fontSize="large" />
                  </Box>

                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{p:1, minWidth: 200, height: 100}}>
            <CardContent>
              <Box sx={{display: "flex"}}>
                <Box sx={{width: "70%"}}>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 15 }}>
                    Wished By
                  </Typography>
                  <Typography variant="h6">
                    1080
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'green', fontSize: 12 }}>
                    12% increase
                  </Typography>
                </Box >
                <Box sx={{width: "30%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <Box sx={{width: "50px", height: "50px", color: "red", borderRadius: "25px", backgroundColor: "pink", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <FavoriteIcon fontSize="large" />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>


        </Box>



      </Box>
    </Box>
  )
} 
