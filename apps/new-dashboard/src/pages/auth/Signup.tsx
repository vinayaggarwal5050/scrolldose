import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton, InputAdornment, Card, CardContent } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../../constants/backend-url";
import { useCPData } from "../../global-states/CPProvider";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { setCpData } = useCPData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setMsg("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMsg("Passwords do not match!");
      return;
    }

    const jsonRes = await fetch(`${backendURL}/channel-partner/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const res = await jsonRes.json();
    
    if (res.status) {
      setMsg(res.msg);
      console.log(res.data);
      localStorage.setItem("cpJWT", res.data.cpJWT);
      setCpData(res.data);
      setTimeout(() => {
        navigate("/cp/");
      }, 1000);

    } else {
      setMsg(res.msg);
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="inherit" size="large" component={Link} to="/">
            Scroll Dose
          </Button>
          <Button color="inherit" component={Link} to="/signin">
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Card sx={{ mt: 5, boxShadow: 3 }}>
          <CardContent>
          <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
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
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            margin="normal"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography sx={{ mt: 2, color: "red" }}>{msg}</Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Sign Up
          </Button>
          <Typography sx={{ mt: 2 }}>
            Already have an account? <Link to="/signin">Sign In</Link>
          </Typography>
        </Box>
          </CardContent>
        </Card>

      </Container>
    </>
  );
};

export default SignUp;
