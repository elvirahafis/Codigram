import IStory from "../../schemas/story";
import Story from "./story";
import React, { useEffect, useState } from "react";
import { getlistuser } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";

const StoryBoard = () => {
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
    <section className="card flex gap-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
      {getlistuserResult ? (
        getlistuserResult.map((story: IStory, i: any) => {
          // let username = story?.username?.split(" ").join("").toLowerCase();
          // console.log(story.image);
          // username =
          //   username.length <= 10 ? username : `${username.slice(0, 8)}...`;
          return (
            <Story
              key={story.id}
              username={story.username}
              image={story.image}
            />
          );
        })
      ) : getlistuserLoading ? (
        <p> Loading . . .</p>
      ) : (
        <p> {getlistuserError ? getlistuserError : "Data Kosong"}</p>
      )}
      {/* {t.map((story: IStory, i: any) => {
        // let username = story?.username?.split(" ").join("").toLowerCase();
        // console.log(username);
        // username =
        //   username.length <= 10 ? username : `${username.slice(0, 8)}...`;
        return (
          <Story
            key={story.id}
            username={story.username}
            image={story.imageuser}
          />
        );
      })} */}
    </section>
  );
};

export default StoryBoard;
