import * as React from "react";
import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import Alert from "@mui/material/Alert";
import "./Login.css";

import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import bg from "../../assets/insta.png";
import insta from "../../assets/instagram-logo.png";
import { useNavigate } from "react-router-dom";
import { Form, Image } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [usr, setEmail] = useState("");
  const [pswd, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = (event: any) => {
    console.log(usr, pswd, "ss");
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
          url: `http://localhost:3001/login`,
          timeout: 12000,
          data: { usr, pswd },
        }).then((response) => {
          console.log("3. berhasil  data :", response.data);
          const access_token = response.data.data_codigram;
          console.log(access_token);
          localStorage.setItem("access_token", access_token);
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
              text: "Login Succes",
            });
            navigate("/home");
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
    <div className="loginWrapper">
      <div
        className="imgcar"
        style={{ backgroundImage: "url(" + bg + ")", backgroundSize: "cover" }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={5}
            // step={3}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            {/* <Slider>
              <Slide index={0}>
                <Image src={img1} />
              </Slide>
              <Slide index={1}>
                <Image src={img2} />
              </Slide>
              <Slide index={2}>
                <Image src={img3} />
              </Slide>
              <Slide index={3}>
                <Image src={img4} />
              </Slide>
              <Slide index={4}>
                <Image src={img5} />
              </Slide>
            </Slider> */}
          </CarouselProvider>
        </div>
      </div>
      <div className="loginCard">
        {/* <Form onSubmit={(event: any) => handleClick(event)}> */}
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            {/* {error != "" && <Alert severity="error">{error}</Alert>} */}
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              type="text"
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
              type="password"
              value={pswd}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              onClick={handleClick}
              variant="contained"
            >
              Log in
            </Button>
          </CardActions>
        </Card>
        {/* </Form> */}

        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1">
              Don't have an account ?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
