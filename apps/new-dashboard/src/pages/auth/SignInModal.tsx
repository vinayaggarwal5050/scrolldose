import React, { useState } from "react";
import { Modal, Container, TextField, Button, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../../constants/backend-url";

const SignInModal: React.FC<{ open: boolean; handleClose: () => void }> = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setMsg("All fields are required!");
      return;
    }
    
    try {
      const jsonRes = await fetch(`${backendURL}/channel-partner/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const res = await jsonRes.json();
      console.log(res);

      if (res.status) {
        setMsg(res.msg + "\n" + "Navigating to Dashboard");
        localStorage.setItem("cpJWT", res.data.cpJWT);
        setTimeout(() => {
          navigate("/cp/");
          handleClose();
        }, 1000);
      } else {
        setMsg(res.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    handleClose();
    navigate("/");
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 2, boxShadow: 24, position: "relative", width: "100%" }}>
          <IconButton onClick={handleCloseModal} sx={{ position: "absolute", top: 8, right: 8 }}>
            <Close />
          </IconButton>
          <Typography variant="h4" gutterBottom textAlign="center">
            Sign In
          </Typography>
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
          <Typography sx={{ mt: 2, color: "gray" }}>{msg}</Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Sign In
          </Button>
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Container>
    </Modal>
  );
};

export default SignInModal;