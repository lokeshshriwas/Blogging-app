import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";

const PostCard = ({ post }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await fetch(`/api/user/${post.userId}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [post]);

  return (
    <div className="p-4 flex flex-col justify-center bg-gray-100 dark:bg-stone-800 rounded-3xl group shadow-lg hover:shadow-gray-400 dark:hover:shadow-stone-950  transition-all duration-300">
      <Link to={`/post/${post.slug}`} className="h-[160px]">
        <img
          src={post.image}
          alt={post.title}
          className="rounded-3xl h-[150px] group-hover:h-[160px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="py-3 w-full flex justify-between">
        <Badge className="text-xs w-fit px-2 py-1 rounded-full">
          {post.category}
        </Badge>
        <div className="flex items-center gap-4 px-2">
          <CiHeart className="text-lg" />
          <FaRegBookmark />
        </div>
      </div>
      <h1 className="text-xl font-semibold my-2">{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: post && post.content.trim().slice(0, 40) + "...",
        }}
        className="text-xs mb-2 font-semibold"
      ></div>
      <div className="w-full flex justify-end py-3">
        <Link to={`/post/${post.slug}`}>
          <button className="bg-yellow-400 w-fit text-black font-semibold shadow-md shadow-black hover:bg-yellow-500 flex py-2 px-2 rounded-full items-center ">
            Read full article &nbsp;
            <FaArrowRight />
          </button>
        </Link>
      </div>
      <div>
        <div className="flex shrink-0 mr-3">
          <img
            className="w-10 h-10 rounded-full bg-gray-200"
            src={user && user.profilePicture}
            alt={user && user.username}
          />
          <div className="px-2 flex flex-col mb-4">
            <p className="font-semibold">{user && user.username}</p>
            <span className="text-xs">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
