import * as React from "react";
import { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Alert from "@mui/material/Alert";
import "./createpost.css";
import bg from "../../assets/insta.png";
import insta from "../../assets/instagram-logo.png";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

interface JwtPayload {
  id: any;
}
export default function Editpost() {
  const [description, setDescription] = useState("");
  const [imageuser, setImage] = useState("");
  const id = useParams();
  console.log(id, "aa");
  const navigate = useNavigate();
  const token: any = localStorage.getItem("access_token");
  console.log(token, "123");
  const decodedToken = jwtDecode<JwtPayload>(token);
  const user_id = decodedToken.id;
  const getPost = async () => {
    const response = await axios.get(`http://localhost:3001/detail/${id.id}`);
    const data = await response.data.data_codigram;

    setDescription(data.description);
    setImage(data.image);
  };
  const handleClick = (event: any) => {
    console.log(description, "123");
    console.log(id.id, "ww");
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
        axios({
          method: "POST",
          url: `http://localhost:3001/updatepostingan/${id.id}`,
          timeout: 12000,
          data: { description },
        }).then((response: any) => {
          console.log("3. berhasil  data :", response.data);
          if (response.data.data_codigram !== 400) {
            Swal.fire({
              icon: "success",
              text: "Create Posting Succes",
            });
            navigate(`/profil/${user_id}`);
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
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
            />
            <div className="relative -mx-5 aspect-square overflow-hidden">
              <img
                className="w-full"
                src={`http://localhost:3001/uploads/${imageuser}`}
                alt={imageuser}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              onClick={handleClick}
            >
              Posting
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1"> </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
