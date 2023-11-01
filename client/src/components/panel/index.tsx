import people from "../../data/people";
import IPerson from "../../schemas/person";
import Button from "./button";
import Person from "./person";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getlistuser } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";
import { Outlet, Link } from "react-router-dom";
interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;

  // whatever else is in the JWT.
}
const Panel = () => {
  const token: any = localStorage.getItem("access_token");
  // console.log(token, "123");
  const decodedToken = jwtDecode<JwtPayload>(token);
  const { getlistuserResult, getlistuserLoading, getlistuserError } =
    useAppSelector((state) => state.users);
  // const t = Object.entries(getlisthomeResult);
  // console.log(getlistuserResult, "w");
  const t = [getlistuserResult];
  const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log("1. use effect home");
    dispatch(getlistuser());
  }, [dispatch]);
  return (
    <section className="w-[22rem] hidden lg:block lg:fixed ml-[30.5rem] space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 cursor-pointer">
            <img
              className="w-full"
              src={`http://localhost:3001/profiluser/${decodedToken.image}`}
              alt="Random Guy"
            />
          </div>

          <div>
            <h2 className="font-semibold text-md">
              <h3 className="font-semibold text-md">{decodedToken.username}</h3>
            </h2>
          </div>
        </div>

        <Button>Profil</Button>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-md">This is my Account Codigram</h1>
      </div>
    </section>
  );
};

export default Panel;
