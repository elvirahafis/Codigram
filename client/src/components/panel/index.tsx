import people from "../../data/people";
import IPerson from "../../schemas/person";
import Button from "./button";
import Person from "./person";
import React, { useEffect, useState } from "react";
import { getlisthome } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";

const Panel = () => {
  const { getlisthomeResult, getlisthomeLoading, getlisthomeError } =
    useAppSelector((state) => state.users);
  // const t = Object.entries(getlisthomeResult);

  const t = [getlisthomeResult];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getlisthome());
  }, [dispatch]);
  return (
    <section className="w-[22rem] hidden lg:block lg:fixed ml-[30.5rem] space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 cursor-pointer">
            {getlisthomeResult ? (
              t.map((keyt: any, i: any) => (
                <img
                  className="w-full"
                  key={i}
                  src={`http://localhost:3001/profiluser/${keyt.image}`}
                  alt="Random Guy"
                />
              ))
            ) : getlisthomeLoading ? (
              <p> Loading . . .</p>
            ) : (
              <p> {getlisthomeError ? getlisthomeError : "Data Kosong"}</p>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-md">
              {getlisthomeResult ? (
                t.map((keyt: any, i: any) => (
                  <h3 className="font-semibold text-md">{keyt.username}</h3>
                ))
              ) : getlisthomeLoading ? (
                <p> Loading . . .</p>
              ) : (
                <p> {getlisthomeError ? getlisthomeError : "Data Kosong"}</p>
              )}
            </h2>
          </div>
        </div>
        <Button>Logout</Button>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-semibold opacity-50">Suggestions For You</h1>
        <Button blacked>See All</Button>
      </div>

      <div className="space-y-4">
        {people.map((person: IPerson) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
};

export default Panel;
