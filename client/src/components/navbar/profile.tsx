import React, { useEffect, useState } from "react";
import { getlisthome } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";

const Profile = () => {
  const { getlisthomeResult, getlisthomeLoading, getlisthomeError } =
    useAppSelector((state) => state.users);
  const t = [getlisthomeResult];
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("1. use effect home");
    dispatch(getlisthome());
  }, [dispatch]);
  return (
    <div className="rounded-full overflow-hidden w-6 h-6 cursor-pointer">
      {getlisthomeResult ? (
        t.map((keyt: any, i: any) => (
          <img
            className="w-full"
            key={i}
            src={`http://localhost:3001/profiluser/${keyt.image}`}
            alt={keyt.id}
          />
        ))
      ) : getlisthomeLoading ? (
        <p> Loading . . .</p>
      ) : (
        <p> {getlisthomeError ? getlisthomeError : "Data Kosong"}</p>
      )}
    </div>
  );
};

export default Profile;
