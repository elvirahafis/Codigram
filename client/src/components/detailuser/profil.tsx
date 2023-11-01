import { Avatar, Button } from "@mui/material";
import Post from "./post";
import React, { useEffect, useState } from "react";
import { getdetailuser, getlistuserpost } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Layout from "../layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profil.css";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;

  // whatever else is in the JWT.
}
export const DetailP = () => {
  const { getlistuserposResult, getlistuserposLoading, getlistuserposError } =
    useAppSelector((state) => state.users);
  const { getlistdetailResult, getlistdetailLoading, getlistdetailError } =
    useAppSelector((state) => state.users);
  // console.log(getlistdetailResult, "12345");
  const token: any = localStorage.getItem("access_token");
  const id = useParams();
  const detail = [getlistdetailResult];
  const decodedToken = jwtDecode<JwtPayload>(token);
  const t = getlistuserposResult.length;
  const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log("1. use effect home");
    dispatch(getdetailuser(id.id));
    dispatch(getlistuserpost(id.id));
  }, [dispatch]);
  return (
    <>
      <Layout>
        <div className=" content center">
          <div className="profile-page">
            <div className="profile-head">
              <div className="head-left">
                {getlistdetailResult ? (
                  detail.map((post: any) => (
                    <Avatar
                      src={`http://localhost:3001/profiluser/${post.image}`}
                      sx={{ width: 150, height: 150 }}
                    />
                  ))
                ) : getlistdetailLoading ? (
                  <p> Loading . . .</p>
                ) : (
                  <p>
                    {" "}
                    {getlistdetailError ? getlistdetailError : "Data Kosong"}
                  </p>
                )}
              </div>
              <div className="head-right content center">
                <div className="head-right-top">
                  {getlistdetailResult ? (
                    detail.map((post: any) => (
                      <span className="profile-page-username">
                        {post.username}
                      </span>
                    ))
                  ) : getlistdetailLoading ? (
                    <p> Loading . . .</p>
                  ) : (
                    <p>
                      {" "}
                      {getlistdetailError ? getlistdetailError : "Data Kosong"}
                    </p>
                  )}

                  <div className="profile-page-buttons"></div>
                </div>
                <div className="head-right-center">
                  <div className="post-count">
                    <b>{t}</b>
                    <span>posts</span>
                  </div>
                  <div className="follower-count">
                    <b>1 JT</b>
                    <span>followers</span>
                  </div>
                  <div className="following-count">
                    <b> 0</b>
                    <span>followings</span>
                  </div>
                </div>
                <div className="head-right-bottom">
                  <b></b>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="profile-body">
              {/* <div className="profile-nav-tabs">
            <button className="active">
              <GridOnOutlinedIcon />
              <span>POSTS</span>
            </button>
            <button>
              <VideoLibraryOutlinedIcon />
              <span>VIDEOS</span>
            </button>
            <button>
              <BookmarkAddOutlinedIcon />
              <span>SAVE</span>
            </button>
            <button>
              <AccountBoxOutlinedIcon />
              <span>TAGGED</span>
            </button>
          </div> */}
              <div className="profile-post-grid">
                <div className="grid-post">
                  {getlistuserposResult ? (
                    getlistuserposResult.map((post: any) => (
                      <Post key={post.id} post={post} />
                    ))
                  ) : getlistuserposLoading ? (
                    <p> Loading . . .</p>
                  ) : (
                    <p>
                      {" "}
                      {getlistuserposError
                        ? getlistuserposError
                        : "Data Kosong"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
