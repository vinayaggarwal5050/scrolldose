import React from "react";
import { Container, Typography, Button, Box, Grid, Card, CardContent, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="inherit" size="large" component={Link} to="/">
            Scroll Dose
          </Button>
          <Box>
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mt: 8, p: 4 }}>
          <Typography variant="h2" gutterBottom>
            Grow Your Business with Us
          </Typography>
          <Typography variant="h5" paragraph>
            Join as a seller, showcase your products, and engage customers with interactive videos.
            Expand your reach and boost your sales with our seamless platform.
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} to="/signup" sx={{ mt: 3 }}>
            Get Started
          </Button>
        </Box>
        <Grid container spacing={4} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Sell Your Products
                </Typography>
                <Typography>
                  List your products on our platform and reach thousands of potential customers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Create Engaging Videos
                </Typography>
                <Typography>
                  Showcase your products through high-quality videos to increase customer engagement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", mt: 8, p: 4, bgcolor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Why Choose Us?
          </Typography>
          <Typography variant="h6" paragraph>
            ✓ Easy product listing and management <br />
            ✓ Powerful analytics to track performance <br />
            ✓ High customer engagement through videos <br />
            ✓ Secure and scalable platform for sellers
          </Typography>
          <Button variant="contained" color="primary" size="large" component={Link} to="/signup" sx={{ mt: 3 }}>
            Join Now
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;
