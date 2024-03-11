import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowDeleteModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        { method: "DELETE" }
      );
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-4xl table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-stone-100 scrollbar-thumb-stone-300 dark:scrollbar-track-stone-800 dark:scrollbar-thumb-stone-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Bookmarked By</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
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
                    <Link to={`/search?category=${post.category}`}>{post.category}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    {post.bookmarkCount} users
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-teal-500"
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className="font-md text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7 underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center ">
            <BsExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray500 dark:text-gray-400">
              Are you sure you want to delete the Post
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPosts;
