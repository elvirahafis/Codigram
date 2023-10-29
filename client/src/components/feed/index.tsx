import Post from "./post";
import React, { useEffect, useState } from "react";
import { getlistposting } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";

const Feed = () => {
  const { getlistpostingResult, getlistpostingLoading, getlistpostingError } =
    useAppSelector((state) => state.users);
  // const t = Object.entries(getlisthomeResult);
  // console.log(getlistpostingResult, "w");
  const t = [getlistpostingResult];
  const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log("1. use effect home");
    dispatch(getlistposting());
  }, [dispatch]);
  return (
    <section className="space-y-3">
      {getlistpostingResult ? (
        getlistpostingResult.map((post: any) => (
          <Post key={post.id} post={post} />
        ))
      ) : getlistpostingLoading ? (
        <p> Loading . . .</p>
      ) : (
        <p> {getlistpostingError ? getlistpostingError : "Data Kosong"}</p>
      )}
    </section>
  );
};

export default Feed;
