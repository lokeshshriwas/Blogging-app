import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess
} from "../redux/user/userSlice";
import { BsExclamationCircle } from "react-icons/bs";

const DashProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileProgress, setImageFileProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (
      file.type != "image/png" &&
      file.type != "image/jpg" &&
      file.type != "image/jpeg"
    ) {
      setImageFileProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
      return setImageFileUploadError("Image must be in PNG or JPG formate");
    }
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileProgress(progress.toFixed(0));
      },
      (error) => {
        // Handle unsuccessful uploads
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
          })
          .catch((error) =>
            console.log("error occured in obtaining imageurl" + error.message)
          );
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Image is uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        setImageFileProgress(null);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data= await res.json()
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      } else{
        dispatch(deleteUserSuccess())
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4 w" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileProgress && (
            <CircularProgressbar
              value={imageFileProgress || 0}
              text={`${imageFileProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-4 object-cover border-b-gray-500 ${
              imageFileProgress && imageFileProgress < 100 && "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholzder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="greenToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 items-center">
        <span
          className="cursor-pointer text-md"
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </span>
        <Button className="cursor-pointer" color="failure" onClick={handleSignout}>
          Sign Out
        </Button>
      </div>
      {updateUserSuccess && (
        <Alert color={"success"} className="mt-4">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color={"failure"} className="mt-4">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color={"failure"} className="mt-4">
          {error}
        </Alert>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center ">
            <BsExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray500 dark:text-gray-400">
              Are you sure you want to delete the account
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
