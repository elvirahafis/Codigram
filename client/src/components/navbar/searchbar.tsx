import { SearchIcon } from "@heroicons/react/outline";
import Button from "./button";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Post from "../feed/post";
const Searchbar = () => {
  const [searchdata, setSearch] = useState();
  return (
    <div className="bg-neutral-200 px-4 py-1.5 rounded-lg md:flex items-center gap-2 hidden">
      <SearchIcon className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus:outline-none"
        value={searchdata}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <Button searchdata={searchdata}>Search</Button>
      {/* <Post searchdata={searchdata} /> */}
      <Outlet />
    </div>
  );
};

export default Searchbar;
