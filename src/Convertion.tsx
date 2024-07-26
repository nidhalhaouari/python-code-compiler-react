import React, { useState } from "react";
import axios from "axios";
import "./Convertion.css";
import NavBar from "./NavBar";
import useToken from "./useToken";

const Convertion: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState<string>("");

  const handleToken = () => {
    setToken("");
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setText(e.target.result);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    if (file) {
      formData.append("file", file);
    }
    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/generate_pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // important pour recevoir un fichier Blob en réponse
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <NavBar token={handleToken} />
      <div className="container">
        <p className="font-monospace">
          This online Text to PDF converter free and accurately converts txt
          files to PDF formats. To use this tool, copy-paste text or select a
          .txt file to upload. Next, click on the Covert button to convert the
          text file with high accuracy.
        </p>
        <div className="row justify-content-center">
          <div className="col-24 col-sm-12 text-center mx-auto">
            <div className="alert shadow" role="alert">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="form-floating">
                      <textarea
                        name="text1"
                        rows={16}
                        cols={169}
                        placeholder="Drag and drop file or write text"
                        value={text}
                        onChange={handleTextChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <br />
                <div className="input-group mb-3">
                  <button type="submit" className="btn btn-dark w-25">
                    Convertir
                  </button>
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                    onChange={handleFileChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Convertion;
