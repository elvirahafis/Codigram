import Post from "./post";
import React, { useEffect, useState } from "react";
import { getlistposting, getlistpostingid } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";
import { useParams } from "react-router-dom";

const Feed = () => {
  const {
    getlistpostingResult,
    getlistpostingLoading,
    getlistpostingError,
    getlistsearchResult,
  } = useAppSelector((state) => state.users);
  const id = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id.id == undefined) {
      dispatch(getlistposting());
    } else {
      dispatch(getlistpostingid(id.id));
    }
  }, [dispatch, id]);
  return (
    <section className="space-y-3">
      {getlistpostingResult ? (
        getlistpostingResult.map((post: any) => (
          <Post key={post.id} post={post} />
        ))
      ) : getlistsearchResult ? (
        getlistsearchResult.map((post: any) => (
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
