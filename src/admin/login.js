import * as React from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "./shared-theme/AppTheme";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
import { useAuth } from "./AuthContext"; // Import useAuth

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(100px)",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "linear-gradient(to right, hsl(210, 70.10%, 82.90%), hsl(0, 0.00%, 100.00%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [submitError, setSubmitError] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Sử dụng useAuth để lấy hàm login

  React.useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setRememberMe(true);
      document.getElementById("email").value = savedEmail;
      document.getElementById("password").value = savedPassword;
    }
  }, []);

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Mật khẩu phải ít nhất 6 kí tự.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    const data = new FormData(event.currentTarget);
    const username = data.get("email");
    const password = data.get("password");

    // Lưu thông tin người dùng vào localStorage nếu "Ghi nhớ tài khoản" được chọn
    if (rememberMe) {
      localStorage.setItem("savedEmail", username);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }

    try {
      await login(username, password); // Gọi hàm login từ AuthContext
      navigate("/admin/dashboard"); // Chuyển hướng sau khi đăng nhập
    } catch (error) {
      setSubmitError(error.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const Logo = styled("img")({
    width: "auto",
    height: "100px",
    alignSelf: "center",
    marginBottom: "16px",
  });

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Logo src={logo} alt="Logo" />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Tài khoản</FormLabel>
              <TextField
                required
                fullWidth
                disabled={loading}
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? "error" : "primary"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              <TextField
                required
                fullWidth
                disabled={loading}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                  },
                }}
              />
            </FormControl>
            {submitError && (
              <Typography color="error" variant="body2" align="center">
                {submitError}
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Ghi nhớ tài khoản"
            />
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={24} color="inherit" sx={{ color: "white" }} /> : ""
              }
              sx={{
                px: 4,
                py: 1,
                fontSize: "16px",
                borderRadius: "8px",
                textTransform: "none",
                transition: "0.3s",
                backgroundColor: "#1565c0",
                color: loading ? "white" : "white",
                "&:hover": { backgroundColor: "#0d47a1" },
              }}
            >
              <span style={{ color: loading ? "white" : "white" }}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </span>
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}