import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi2";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashBoardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthsUsers, setLastMonthsUsers] = useState(0);
  const [lastMonthsComments, setLastMonthsComments] = useState(0);
  const [lastMonthsPosts, setLastMonthsPosts] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUser(data.totalUsers);
          setLastMonthsUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthsPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthsComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen max-w-6xl mx-auto flex flex-col">
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col p-3 dark:bg-stone-900 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUser}</p>
            </div>
            <HiMiniUserGroup className="bg-green-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm items-center mt-4">
            <span className="text-green-500 flex items-center">
              <FaRegArrowAltCircleUp /> &nbsp;
              {lastMonthsUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-stone-900 w-full  rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <FaCommentDots className="bg-red-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm items-center mt-4">
            <span className="text-green-500 flex items-center">
              <FaRegArrowAltCircleUp /> &nbsp;
              {lastMonthsComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-stone-900 w-full  rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-purple-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm items-center mt-4">
            <span className="text-green-500 flex items-center">
              <FaRegArrowAltCircleUp /> &nbsp;
              {lastMonthsPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="mx-3 mb-4">
        <div className="flex flex-col w-full md:w-auto shadow-md p-3 rounded-md dark:bg-stone-900 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="tex-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone={"greenToBlue"}>
              <Link to={`/dashboard?tab=posts`}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Post Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divider-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-stone-800">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="post"
                        className="w-14 h-10 rounded-md bg-stone-700"
                      />
                    </Table.Cell>
                    <Table.Cell className="truncate">{post.title}</Table.Cell>
                    <Table.Cell className="">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-4">
        <div className="mx-3">
          <div className="flex flex-col w-full md:w-auto shadow-md p-3 rounded-md dark:bg-stone-900 ">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className="tex-center p-2">Recent Users</h1>
              <Button outline gradientDuoTone={"greenToBlue"}>
                <Link to={`/dashboard?tab=users`}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => (
                  <Table.Body key={user._id} className="divider-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-stone-800">
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt="user"
                          className="w-10 h-10 rounded-full bg-stone-700"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
        <div className="mx-3">
          <div className="flex flex-col w-full md:w-auto shadow-md p-3 rounded-md dark:bg-stone-900 ">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className="tex-center p-2">Recent Comments</h1>
              <Button outline gradientDuoTone={"greenToBlue"}>
                <Link to={`/dashboard?tab=comments`}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {comments &&
                comments.map((comment) => (
                  <Table.Body key={comment._id} className="divider-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-stone-800">
                      <Table.Cell className="w-96">
                        <p className="line-clamp-2 ">{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardComp;
