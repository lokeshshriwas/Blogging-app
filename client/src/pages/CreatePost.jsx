import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (
      file.type != "image/png" &&
      file.type != "image/jpg" &&
      file.type != "image/jpeg"
    ) {
      return setImageUploadError(
        "Please select an image of PNG or JPEG formate "
      );
    }
    setImageFile(file);
  };

  const uploadImage = () => {
    if (!imageFile) {
      return setImageUploadError("Please select an image first");
    }
    try {
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },

        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            setImageFile(null);
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="fashion">fashion</option>
            <option value="food">food</option>
            <option value="travel">travel</option>
            <option value="home">home</option>
            <option value="relationships">relationships</option>
            <option value="health">health</option>
            <option value="marketing">marketing</option>
            <option value="finance">finance</option>
            <option value="entrepreneurship">entrepreneurship</option>
            <option value="technology">technology</option>
            <option value="creative">creative</option>
            <option value="journal">journal</option>
            <option value="movies">movies</option>
            <option value="music">music</option>
            <option value="games">games</option>
            <option value="news">news</option>
            <option value="other">other</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Button
            type="button"
            gradientDuoTone="greenToBlue"
            size="sm"
            outline
            onClick={uploadImage}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && (
          <Alert color={"failure"}>{imageUploadError}</Alert>
        )}
        {
          formData.image && (
            <img src={formData.image} alt="uploaded Image" className="w-full h-72 object-cover"/>
          )
        }
        <ReactQuill theme="snow" required className="h-72 mb-12" />
        <Button type="submit" gradientDuoTone={"greenToBlue"}>
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
