import React, { useState } from "react";
import axios from "axios";
import "./Convertion.css";
import NavBar from "./NavBar";

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
          responseType: "blob",
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
      <div className="container mt-4">
        <div className="converter-description text-center">
          <p className="font-monospace">
            Convert text to PDF with ease! Upload a .txt file or write/paste your text
            below, and click 'Convert' to download the PDF.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12 text-center mx-auto">
            <div className="converter-card shadow-lg p-4 rounded">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="form-floating">
                    <textarea
                      className="form-control rounded"
                      name="text1"
                      rows={16}
                      placeholder="Write text or drag and drop file"
                      value={text}
                      onChange={handleTextChange}
                      style={{ minHeight: "400px" }}
                    ></textarea>
                    <label htmlFor="text1">Write text or drag and drop file</label>
                  </div>
                </div>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                    onChange={handleFileChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    Convert
                  </button>
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
