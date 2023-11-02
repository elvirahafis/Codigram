import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./edituser.css";
import bg from "../../assets/insta.png";
import insta from "../../assets/instagram-logo.png";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;
  email: any;
  password: any;
  // whatever else is in the JWT.
}
export default function Edituser() {
  const [usr, setEmail] = useState("");
  const [pswd, setPassword] = useState("");
  const [imageuser, setImage] = useState("");

  const navigate = useNavigate();
  const token: any = localStorage.getItem("access_token");
  const decodedToken = jwtDecode<JwtPayload>(token);

  const getdatauser = async () => {
    const response = await axios.get(
      `http://localhost:3001/profil/${decodedToken.id}`
    );
    const data = await response.data.data_codigram;

    setEmail(data.username);
    setImage(data.image);
  };
  useEffect(() => {
    getdatauser();
  }, []);

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
          url: `http://localhost:3001/updateuser/${decodedToken.id}`,
          timeout: 12000,
          data: { usr, pswd },
        }).then((response: any) => {
          // console.log("3. berhasil  data :", response.data);
          //   const access_token = response.data.data_codigram;
          //   console.log(access_token);
          //   localStorage.setItem("access_token", access_token);
          if (response.data.data_codigram !== 400) {
            Swal.fire({
              icon: "success",
              text: "Create User Succes",
            });
            navigate(`/profil/${decodedToken.id}`);
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
            <Typography variant="subtitle1">Update Your Profile</Typography>
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
            <div className="relative -mx-5 aspect-square overflow-hidden">
              <img
                className="w-full"
                src={`http://localhost:3001/profiluser/${imageuser}`}
                alt={imageuser}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              //   value={imageuser}
              onChange={(e: any) => setImage(e.target.files[0])}
            />
            {/* <label htmlFor="contained-button-file">
              <Button
                color="secondary"
                fullWidth={true}
                variant="outlined"
                component="span"
              >
                Upload Profile Image
              </Button>
            </label> */}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              //   disabled={loading}
              onClick={handleClick}
            >
              Edit Profile
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined"></Card>
      </div>
    </div>
  );
}
