import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);

  const handleSignout = async () =>{
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST"
      })
      const data = await res.json()
      if(!res.ok){
        console.group(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Sidebar className="w-full" >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to={`/dashboard?tab=profile`}>
              <Sidebar.Item
                active={tab === "profile"}
                icon={FaUserAlt}
                label={"User"}
                labelColor={"dark"}
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={IoLogOut} className={"cursor-pointer"} onClick={handleSignout}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
