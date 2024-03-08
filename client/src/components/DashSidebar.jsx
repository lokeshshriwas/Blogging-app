import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiDocumentText } from "react-icons/hi2";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.group(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={`/dashboard?tab=profile`}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor={"dark"}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to={`/dashboard?tab=posts`}>
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                labelColor={"dark"}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={`/dashboard?tab=users`}>
              <Sidebar.Item
                active={tab === "users"}
                icon={HiMiniUserGroup}
                labelColor={"dark"}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={IoLogOut}
            className={"cursor-pointer"}
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
