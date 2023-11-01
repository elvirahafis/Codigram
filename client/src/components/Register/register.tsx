import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import "./register.css";
import bg from "../../assets/insta.png";
import insta from "../../assets/instagram-logo.png";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Signup() {
  const [usr, setEmail] = useState("");
  const [pswd, setPassword] = useState("");
  const [imageuser, setImage] = useState("");
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // axios;
        //   .post("http://localhost:3001/register", formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   })
        axios({
          method: "POST",
          url: `http://localhost:3001/createuser`,
          timeout: 12000,
          data: { usr, pswd, imageuser },
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then((response: any) => {
          console.log("3. berhasil  data :", response.data);
          //   const access_token = response.data.data_codigram;
          //   console.log(access_token);
          //   localStorage.setItem("access_token", access_token);
          if (response.data.data_codigram !== 400) {
            Swal.fire({
              icon: "success",
              text: "Create User Succes",
            });
            navigate("/");
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
        });
      }
    });
  };
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            <Typography variant="subtitle1">
              Sign up to see photos and videos from your friends
            </Typography>
            {/* {error != "" && <Alert severity="error">{error}</Alert>} */}
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={usr}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={pswd}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              //   value={imageuser}
              onChange={(e: any) => setImage(e.target.files[0])}
            />
            <label htmlFor="contained-button-file">
              <Button
                color="secondary"
                fullWidth={true}
                variant="outlined"
                component="span"
              >
                Upload Profile Image
              </Button>
            </label>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              //   disabled={loading}
              onClick={handleClick}
            >
              Sign up
            </Button>
          </CardActions>
          <CardContent>
            <Typography className="placeholder:" variant="subtitle1">
              By signing up, you agree to our Terms, Conditions and Cookies
              policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">
              Having an account ?{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
