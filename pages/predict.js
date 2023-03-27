import React, { useState } from "react";
import Cors from "cors";

const cors = Cors();
export default function Predict() {
  const [picture, setPicture] = useState(null);

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    // Create a FormData object to send the picture to the Flask server
    const formData = new FormData();
    formData.append("picture", picture);

    // Send the picture to the Flask server using the fetch API
    const response = await fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="picture">Choose a picture:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handlePictureUpload}
        id="picture"
        name="picture"
      />
      <button type="submit">Upload Picture</button>
    </form>
  );
}
