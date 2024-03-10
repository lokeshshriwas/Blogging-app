import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  TextInput,
  theme,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiGitlabLogoSimpleLight } from "react-icons/pi";
import { AiOutlineSearch } from "react-icons/ai";
import { GoSun } from "react-icons/go";
import { IoMoonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("search");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    console.log(searchQuery)
    navigate(`/search?${searchQuery}`)
  };


  return (
    <Navbar className="border-b border-black">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white hidden min-[350px]:inline-flex"
      >
        <PiGitlabLogoSimpleLight className="inline-flex whitespace-nowrap text-white bg-gradient-to-r from-blue-400 via-green-400 to bg-yellow-100  text-2xl sm:text-4xl rounded-lg font-bold" />
        &nbsp; Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          value={searchTerm}
          placeholder="search..."
          rightIcon={AiOutlineSearch}
          className="w-52 sm:w-64 lg:w-96 max-[470px]:w-32 border border-white rounded-lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    
      <div className="flex gap-2 md:order-2 items-center">
        <Button
          className="w-6 h-6 sm:w-10 sm:h-10  sm:inline-flex"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <IoMoonSharp className="text-[#212121] text-sm sm:text-xl" />
          ) : (
            <GoSun className="text-white text-sm sm:text-xl" />
          )}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
                className="h-10 w-10"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-base truncate font-bold ">
                @{currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/sign-in"}>
            <Button gradientDuoTone={"greenToBlue"} outline pill size={"sm"} >
         
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
