import { Sidebar } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);
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
            <Sidebar.Item icon={IoLogOut} className={"cursor-pointer"}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
