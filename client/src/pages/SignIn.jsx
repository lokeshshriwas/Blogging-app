import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess, signInStart, signInFailure} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsDisplay } from "react-icons/bs";
import OAuth from "../components/OAuth";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state=> state.user)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"))
    }
    try {
      dispatch(signInStart())
      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }

      if(res.ok){
        dispatch(signInSuccess(data))
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5 ">
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="john@example.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center">
            <span>Don't have an account?</span>
            <Link to={"/sign-up"} className="underline text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
