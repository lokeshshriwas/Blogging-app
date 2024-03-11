import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        const res = await fetch(`/api/post/getposts`)
        const data = await res.json()
        setPosts(data.posts)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-5xl">Welcome to Fox Blog</h1>
        <p className="text-stone-500 text-sm lg:text-lg">
          Explore a variety of articles and real-life experiences to help you
          live smarter, work better, and feel your best. There's something for
          everyone, from career hacks to fashion finds. Dive in and start your
          journey today!
        </p>
        <Link to={'/search'} className="text-xs sm:text-lg text-teal-500 font-bold hover:underline">
          View all posts
        </Link>
      </div>
      <div className="max-w-4xl md:mx-auto mx-4 mb-4">
        <CallToAction/>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
    {
      posts && posts.length > 0 && (
        <div className="text-2xl font-semibold text-center flex flex-col items-center">
          <h2 className="pb-6">Recent Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              {posts.map((post)=> (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={`/search`} className="text-lg text-teal-500 hover:underline">
              View all post
            </Link>
        </div>
      )
    }
      </div>
    </div>
  );
};

export default Home;
