import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min=h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5 md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center flex items-center whitespace-nowrap text-3xl sm:text-3xl font-bold dark:text-white"
          >
            <span className="inline-flex whitespace-nowrap text-white bg-gradient-to-r from-blue-400 via-green-400 to bg-yellow-100 text-4xl sm:text-4xl rounded-md p-1 font-bold">
              Fox
            </span>{" "}
            &nbsp;Blog
          </Link>
          <p className="text-sm mt-5">
            A blog website with lots of new and latest informations. You can
            signup with your email and password or with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="john@example.com" id="email" />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="greenToBlue" type="submit" >
              Sign up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className="underline text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
