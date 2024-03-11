import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashBookmarks = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userBookmarks, setUserBookmarks] = useState([]); 
  const [bookmarkToDelete, setBookmarkToDelete] = useState("");
  console.log(userBookmarks)

  const fetchBookmarks = async () => {
    try {
      const res = await fetch(`/api/post/mybookmarks`);
      const data = await res.json();
      if (res.ok) {
        setUserBookmarks(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
        fetchBookmarks();
    }
  }, [currentUser._id]);



  const handleDeleteBookmark = async (postId) => {
    try {
      const res = await fetch(
        `/api/post/bookmark/${postId}`,
        { method: "PUT" }
      );
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserBookmarks((prev) =>
          prev.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-4xl table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-stone-100 scrollbar-thumb-stone-300 dark:scrollbar-track-stone-800 dark:scrollbar-thumb-stone-500">
      {currentUser && userBookmarks.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Remove from bookmark</Table.HeadCell>
            </Table.Head>
            {userBookmarks.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-2- h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link>{post.category}</Link>
                  </Table.Cell>
            
                  <Table.Cell>
                    <span
                      className="font-md text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        handleDeleteBookmark(post._id);
                      }}
                    >
                      Remove
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no Bookmarks yet!</p>
      )}
    </div>
  );
};

export default DashBookmarks;
