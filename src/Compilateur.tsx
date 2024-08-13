import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Compilateur.css";
import NavBar from "./NavBar";
import jsPDF from "jspdf";
import CodeEditor from "./CodeEditor";

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [inputs, setInputs] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [theme, setTheme] = useState<string>("vs-dark");

  const handleToken = () => {
    setToken("");
  };

  const handleExecute = async () => {
    try {
      const response = await axios.post<{ output: string }>(
        "http://localhost:5000/execute",
        { code, inputs: inputs.split("\n") }
      );
      setOutput(response.data.output);

      const user_id = localStorage.getItem("email");

      const projectResponse = await axios.post(
        "http://localhost:5000/save_project",
        {
          user_id,
          code_file: code,
          inputs, // Ajouter les inputs à la requête
        }
      );

      if (projectResponse.status === 200) {
        console.log("Project saved successfully");
      } else {
        console.error("Failed to save the project");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setOutput(error.response ? error.response.data.output : "Error occurred");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(output, 10, 10);
    doc.save("output.pdf");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setFileContent(e.target.result);
          setInputs(e.target.result);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "vs-dark" ? "light" : "vs-dark"));
  };

  return (
    <>
      <NavBar token={handleToken} />
      <br />
      <div className="container mt-2">
        <p className="font-monospace text-center">
          Ce compilateur Python en ligne est gratuit et vous permet d'exécuter
          du code Python avec précision. Pour utiliser cet outil, copiez-collez
          votre code Python ou écrivez-le directement dans la zone prévue à cet
          effet. Vous pouvez également télécharger un fichier contenant votre
          input. Ensuite, cliquez sur le bouton 'Exécuter' pour lancer le code
          et voir les résultats instantanément.
        </p>
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <CodeEditor code={code} onChange={setCode} theme={theme} />
            <div className="theme-switch-wrapper mt-3 text-center">
              <label className="theme-switch">
                <input type="checkbox" id="checkbox" onClick={toggleTheme} />
                <div className="slider round"></div>
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <textarea
              className="form-control"
              placeholder="Entrées utilisateur (chaque entrée sur une nouvelle ligne)..."
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
              rows={12}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <pre className="output-console p-3 text-break">
              {output || "Résultats de l'exécution..."}
            </pre>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <button className="btn btn-dark me-2 mb-2" onClick={handleExecute}>
              Run
            </button>
            <button
              className="btn btn-dark me-2 mb-2"
              onClick={handleDownloadPDF}
            >
              Télécharger en PDF
            </button>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="btn btn-dark mb-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
