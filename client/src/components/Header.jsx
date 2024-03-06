import { Avatar, Button, Dropdown, Navbar, TextInput, theme } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { PiGitlabLogoSimpleLight } from "react-icons/pi";
import { AiOutlineSearch } from "react-icons/ai";
import { GoSun } from "react-icons/go";
import { IoMoonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const {theme} = useSelector(state=> state.theme)
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <PiGitlabLogoSimpleLight className="inline-flex whitespace-nowrap text-white bg-gradient-to-r from-blue-400 via-green-400 to bg-yellow-100  text-2xl sm:text-4xl rounded-lg font-bold" />
        &nbsp; Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden " color="gray">
        <AiOutlineSearch className="text-lg" />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-10 h-10 hidden sm:inline-flex" color="gray" pill onClick={()=> dispatch(toggleTheme())}>

          {
            theme === "light" ?  <IoMoonSharp className="text-[#212121] text-xl"/> : <GoSun className="text-white text-xl"/>
          }
         
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-base truncate font-bold ">@{currentUser.email}</span>
            </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
              <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/sign-in"}>
            <Button gradientDuoTone={"greenToBlue"} outline pill>
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
