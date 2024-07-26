import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Compilateur.css";
import NavBar from './NavBar';
import jsPDF from 'jspdf';

const App: React.FC = () => {
  const [token, setToken] = useState<string>("");

  const handleToken = () => {
    setToken("");
  };

  const [code, setCode] = useState<string>('');
  const [inputs, setInputs] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');

  const handleExecute = async () => {
    try {
      const response = await axios.post<{ output: string }>('http://localhost:5000/execute', { 
        code,
        inputs: inputs.split('\n')
      });
      setOutput(response.data.output);
    } catch (error: any) {
      setOutput(error.response ? error.response.data.output : 'Error occurred');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(output, 10, 10);
    doc.save('output.pdf');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setFileContent(e.target.result);
          setInputs(e.target.result);  // Assigner le contenu du fichier aux inputs
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <>
      <NavBar token={handleToken} />
      <br></br>
      <p className="font-monospace">
      Ce compilateur Python en ligne est gratuit et vous permet d'exécuter du code Python avec précision. Pour utiliser cet outil, copiez-collez votre code Python ou écrivez-le directement dans la zone prévue à cet effet. Vous pouvez également télécharger un fichier contenant votre input. Ensuite, cliquez sur le bouton 'Exécuter' pour lancer le code et voir les résultats instantanément.
      </p>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <textarea
              className="form-control code-editor"
              placeholder="Écrivez votre code Python ici..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <pre className="output-console p-3">
              {output || 'Résultats de l\'exécution...'}
            </pre>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <textarea
              className="form-control"
              placeholder="Entrées utilisateur (chaque entrée sur une nouvelle ligne)..."
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 text-center">
            <button className="btn btn-info me-2" onClick={handleExecute}>Run</button>
            <button className="btn btn-primary me-2" onClick={handleDownloadPDF}>Télécharger en PDF</button>
            <input type="file" accept=".txt" onChange={handleFileChange} className="btn btn-secondary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
