import * as React from "react";
import { useContext, useState, useEffect } from "react";
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
import Cookies from "js-cookie";
import "./detailposting.css";
import { TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Layout from "../layout";
import axios from "axios";

export default function Detailposting() {
  const [username, setUsername] = useState("");
  const [imageuser, setImageuser] = useState("");
  const [imagepos, setImagepost] = useState("");
  const [description, setDesc] = useState("");
  const [updatedat, setUpdate] = useState("");
  console.log(imageuser, imagepos);
  const id = useParams();
  const getdetailposting = async () => {
    const response = await axios.get(
      `http://localhost:3001/detailposting/${id.id}`
    );
    const data = await response.data.data_codigram;
    data.map((detail: any) => {
      setImageuser(detail.imageuser);
      setUsername(detail.username);
      setImagepost(detail.imageposting);
      setDesc(detail.description);
      setUpdate(detail.updatedat);
    });
  };
  useEffect(() => {
    getdetailposting();
  });
  return (
    <Layout>
      {/* <div className="loginWrapper">
        <div className="imgcar" style={{}}>
          <img
            className="w-full"
            src={`http://localhost:3001/uploads/${imagepos}`}
            alt={imageuser}
          />
          <div className="car"></div>
        </div>
        <div className="loginCard">
          <CardContent>
            <p>
              <span className="font-semibold">Elvira</span>
              Elvira
            </p>
            <h1 className=" text-gray-500">Elvira</h1>
          </CardContent>
        </div>
      </div> */}
      <div className="relative card space-y-6 content center">
        {/* Heading */}
        <div className="flex justify-between items-center">
          <div className="flex gap-7 items-center -m-2">
            <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
              <img
                className="w-full"
                src={`http://localhost:3001/profiluser/${imageuser}`}
                alt={imageuser}
              />
            </div>
            {/* <Link to="/profil"> */}
            <h2 className=" font-semibold cursor-pointer">{username}</h2>
            {/* </Link>
          <Outlet /> */}
          </div>
        </div>
        {/* Posted Image */}
        <div className="relative -mx-5 aspect-square overflow-hidden cursor-pointer">
          <img
            className="w-full"
            src={`http://localhost:3001/uploads/${imagepos}`}
            alt={username}
          />
        </div>
        {/* Actions */}
        <div className="space-y-2">
          <p>
            <span className="font-semibold">{username} </span>
            {description}
          </p>
          <h3 className="text-xs text-gray-500">{updatedat}</h3>
        </div>

        <div className="h-[1px] relative left-0 right-0 bg-gray-200 -mx-5"></div>

        <div className="flex gap-4"></div>
      </div>
    </Layout>
  );
}
