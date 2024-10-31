// flowbite
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { uploadImage } from "../lib/requests";
import toast from "react-hot-toast";

export default function UploadImage({ foundArt, setImageLoading }) {
  const [image, setImage] = useState(null);

  function handleUpload(e) {
    setImageLoading(true);
    uploadImage(e.target.files[0])
      .then((res) => {
        setImage(res);
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setImageLoading(false);
      });
  }

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="file-upload" value="Upload file" />
      </div>
      <FileInput id="file-upload" accept="image/*" onChange={handleUpload} />
      <input
        type="text"
        className="sr-only"
        defaultValue={image && image}
        name="avatar"
      />
    </div>
  );
}
