import { useState } from "react";
import Cors from "cors";
import { useRouter } from "next/router";
const cors = Cors();

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [forms, setForms] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const newForms = [];
    for (let i = 0; i < count; i++) {
      const classname = event.target[`classname${i}`].value;
      const images = event.target[`images${i}`].files;
      newForms.push({ classname, images });
    }
    setForms(newForms);
  }

  async function handleUpload() {
    const formData = new FormData();
    formData.append("count", count);
    forms.forEach((form, i) => {
      formData.append(`classname${i}`, form.classname);
      Array.from(form.images).forEach((image) => {
        formData.append(`images${i}`, image);
      });
    });
    const response = await fetch("http://127.0.0.1:5000/api/classes", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    setForms([]);
    setCount(0);
    router.push("/predict");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number of forms:
          <input
            type="number"
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <br />
        {[...Array(count)].map((_, i) => (
          <div key={i}>
            <label>
              Class name for form {i + 1}:
              <input type="text" name={`classname${i}`} />
            </label>
            <br />
            <label>
              Images for form {i + 1}:
              <input type="file" name={`images${i}`} multiple />
            </label>
            <br />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {forms.length > 0 && (
        <div>
          <h2>Forms to upload:</h2>
          <ul>
            {forms.map((form, i) => (
              <li key={i}>
                Class name: {form.classname}, Images:{" "}
                {Array.from(form.images)
                  .map((image) => image.name)
                  .join(", ")}
              </li>
            ))}
          </ul>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}
