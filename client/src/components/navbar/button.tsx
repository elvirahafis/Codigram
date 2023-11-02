import { useNavigate } from "react-router-dom";
import { generatePath } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;
}
interface IProps {
  children: React.ReactNode;
  blacked?: boolean;
  searchdata: any;
}

const Button = ({ children, blacked = false, searchdata }: IProps) => {
  const token: any = localStorage.getItem("access_token");
  const decodedToken = jwtDecode<JwtPayload>(token);
  const navigate = useNavigate();
  const detailuser = () => {
    console.log(searchdata);
    searchdata && navigate(generatePath("/search/:id", { id: searchdata }));
    window.location.reload();
  };

  return (
    <button
      onClick={detailuser}
      className={` bg-transparent focus:outline-none ${
        blacked ? "text-black" : "text-black-500"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
