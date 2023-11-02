import { DotsHorizontalIcon } from "@heroicons/react/outline";
import IPost from "../../schemas/post";
import {
  BookmarkIcon,
  EmojiCollection,
  HeartIcon,
  MessageIcon,
  ShareIcon,
} from "./icons";
import { useNavigate } from "react-router-dom";
import { generatePath } from "react-router-dom";
interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const navigate = useNavigate();
  const detailpostingan = () => {
    post.id && navigate(generatePath("/Detailpostingan/:id", { id: post.id }));
  };
  const detailuser = () => {
    post.user_id && navigate(generatePath("/Detail/:id", { id: post.user_id }));
  };
  return (
    <div className="relative card space-y-4 content center">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center -m-2">
          <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
            <img
              className="w-full"
              src={`http://localhost:3001/profiluser/${post.imageuser}`}
              alt={post.imageuser}
            />
          </div>
          {/* <Link to="/profil"> */}
          <h2 onClick={detailuser} className=" font-semibold cursor-pointer">
            {post.username}
            <span className="font-semibold" style={{ display: "none" }}>
              {post.user_id}{" "}
            </span>
          </h2>
          {/* </Link>
          <Outlet /> */}
        </div>
        <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" />
      </div>
      {/* Posted Image */}
      <div className="relative -mx-5 aspect-square overflow-hidden cursor-pointer">
        <span className="font-semibold" style={{ display: "none" }}>
          {post.id}{" "}
        </span>
        <img
          onClick={detailpostingan}
          className="w-full"
          src={`http://localhost:3001/uploads/${post.imageposting}`}
          alt={post.username}
        />
      </div>
      {/* Actions */}
      <div className="space-y-2">
        <p>
          <span className="font-semibold">{post.username} </span>
          {post.description}
        </p>
        <h3 className="text-xs text-gray-500">{post.createdat}</h3>
      </div>

      <div className="h-[1px] relative left-0 right-0 bg-gray-200 -mx-5"></div>

      <div className="flex gap-4"></div>
    </div>
  );
};

export default Post;
