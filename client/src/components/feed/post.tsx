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
  console.log(post.id, "123");
  const detailuser = () => {
    post.id && navigate(generatePath("/profil/:id", { id: post.id }));
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
              {post.id}{" "}
            </span>
          </h2>
          {/* </Link>
          <Outlet /> */}
        </div>
        <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" />
      </div>
      {/* Posted Image */}
      <div className="relative -mx-5 aspect-square overflow-hidden">
        <img
          className="w-full"
          src={`http://localhost:3001/uploads/${post.imageposting}`}
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

      <div className="flex gap-4"></div>
    </div>
  );
};

export default Post;
