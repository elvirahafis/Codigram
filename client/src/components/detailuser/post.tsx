import { DotsHorizontalIcon } from "@heroicons/react/outline";
import axios from "axios";
import Swal from "sweetalert2";
import IPost from "../../schemas/post";
import { getdetailuser } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";
import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  EmojiCollection,
  HeartIcon,
  MessageIcon,
  ShareIcon,
} from "./icons";
import { jwtDecode } from "jwt-decode";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@mui/material";
interface IProps {
  post: IPost;
}
interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;
}
const Post = ({ post }: IProps) => {
  const { getlistdetailResult, getlistdetailLoading, getlistdetailError } =
    useAppSelector((state) => state.users);
  const token: any = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const decodedToken = jwtDecode<JwtPayload>(token);
  const detail = [getlistdetailResult];
  const dispatch = useAppDispatch();
  const id = useParams();

  useEffect(() => {
    // console.log("1. use effect home");
    dispatch(getdetailuser(id.id));
  }, [dispatch]);
  return (
    <div className="relative card space-y-4 content center">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center -m-2">
          <div className="w-8 h-8 overflow-hidden rounded-full ">
            {getlistdetailResult ? (
              detail.map((post: any) => (
                <img
                  className="w-full"
                  src={`http://localhost:3001/profiluser/${post.image}`}
                  alt={post.imageuser}
                />
              ))
            ) : getlistdetailLoading ? (
              <p> Loading . . .</p>
            ) : (
              <p> {getlistdetailError ? getlistdetailError : "Data Kosong"}</p>
            )}
          </div>
          {getlistdetailResult ? (
            detail.map((post: any) => (
              <h2 className=" font-semibold">{post.username}</h2>
            ))
          ) : getlistdetailLoading ? (
            <p> Loading . . .</p>
          ) : (
            <p> {getlistdetailError ? getlistdetailError : "Data Kosong"}</p>
          )}
        </div>
        {/* <TrashIcon class="h-6 w-6 text-gray-500" /> */}
        {/* <Dropdown
          options={options}
          // onChange={onselect.bind(null, null)}
          value={defaultOption}
          placeholder="Select an option"
        /> */}

        <DotsHorizontalIcon className="w-5 h-5 " />
        {/* <BackspaceIcon class="h-6 w-6 text-gray-500" />; */}
      </div>
      {/* Posted Image */}
      <div className="relative -mx-5 aspect-square overflow-hidden">
        <img
          className="w-full"
          src={`http://localhost:3001/uploads/${post.image}`}
          alt={post.username}
        />
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-4">
            <HeartIcon />
            <MessageIcon />
            <ShareIcon />
          </div>
          <BookmarkIcon />
        </div>
        <span className=" font-semibold">{` 100 likes`}</span>
        <p>
          <span className="font-semibold">{post.username} </span>

          {post.description}
        </p>
        <h3 className="text-xs text-gray-500">{post.createdat}</h3>
      </div>

      <div className="h-[1px] relative left-0 right-0 bg-gray-200 -mx-5"></div>
      <Outlet />
      <div className="flex gap-4"></div>
    </div>
  );
};

export default Post;
