import { DotsHorizontalIcon } from "@heroicons/react/outline";
import axios from "axios";
import Swal from "sweetalert2";
import IPost from "../../schemas/post";
import { useState, useEffect } from "react";
import {
  BookmarkIcon,
  EmojiCollection,
  HeartIcon,
  MessageIcon,
  ShareIcon,
} from "./icons";
import { jwtDecode } from "jwt-decode";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../reducer/hooks";
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
  const token: any = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const decodedToken = jwtDecode<JwtPayload>(token);
  const userId = decodedToken.id;
  const [image, setImage] = useState();
  const [username, setUsername] = useState();

  const editposting = (e: any) => {
    post.id && navigate(generatePath("/editpostingan/:id", { id: post.id }));
  };
  const getdatauser = async () => {
    const response = await axios.get(
      `http://localhost:3001/profil/${decodedToken.id}`
    );
    const data = await response.data.data_codigram;

    setUsername(data.username);
    setImage(data.image);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    getdatauser();
  }, [dispatch]);
  const deletedata = () => {
    // console.log(post.id, "1234");
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:3001/deletepostingan/${post.id}`,
          });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          navigate(0);
        }
      });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="relative card space-y-4 content center">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center -m-2">
          <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
            <img
              className="w-full"
              src={`http://localhost:3001/profiluser/${image}`}
              alt={image}
            />
          </div>
          <h2 className=" font-semibold">{username}</h2>
        </div>
        {/* <TrashIcon class="h-6 w-6 text-gray-500" /> */}
        {/* <Dropdown
          options={options}
          // onChange={onselect.bind(null, null)}
          value={defaultOption}
          placeholder="Select an option"
        /> */}

        <DotsHorizontalIcon
          className="w-5 h-5 cursor-pointer"
          onClick={deletedata}
        />
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

          <Button onClick={editposting}>
            <span className="font-semibold" style={{ display: "none" }}>
              {post.id}{" "}
            </span>
            <BookmarkIcon />
          </Button>
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
