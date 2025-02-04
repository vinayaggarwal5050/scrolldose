import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton, InputAdornment, Card, CardContent } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../../constants/backend-url";
import { useCPData } from "../../global-states/CPProvider";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { setCpData } = useCPData();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const jsonRes = await fetch(`${backendURL}/channel-partner/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const res = await jsonRes.json();
      console.log(res);

      if (res.status) {
        setMsg(res.msg + "\n" + " Navigating to Dashboar");
        localStorage.setItem("cpJWT", res.data.cpJWT);
        setCpData(res.data);
        setTimeout(() => {
          navigate("/cp/");
        }, 1000)

      } else {
        setMsg(res.msg);
      }

    } catch(err) {
      console.log(err);
    }

  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="inherit" size="large" component={Link} to="/">
            Scroll Dose
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Card sx={{ mt: 8, boxShadow: 3 }}>
          <CardContent>
          <Box sx={{  textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
          {/* <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} /> */}

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography sx={{ mt: 2, color: "gray" }}>{msg}</Typography>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Sign In
          </Button>
          <Typography sx={{ mt: 2 }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>

          </CardContent>
        </Card>

      </Container>
    </>
  );
};

export default SignIn;
