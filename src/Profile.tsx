import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import NavBar from "./NavBar";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import Swal from 'sweetalert2'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

interface ProfileProps {
  token: string;
  setToken: (token: string) => void;
}

interface ProfileData {
  profile_name: string;
  profile_email: string;
  about_me: string;
}

interface Project {
  id: string;
  code_file: string;
  linK_output_file: string;
  link_input_file: string;
}

interface ApiResponse {
  name: string;
  email: string;
  about: string;
  access_token?: string;
}

const Profile: React.FC<ProfileProps> = ({ token, setToken }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [updatedCode, setUpdatedCode] = useState<string>("");
  const email = localStorage.getItem("email") || "";

  const handleToken = () => {
    setToken("");
  };

  useEffect(() => {
    getUsers();
    getUserProjects();
  }, []);

  const getUsers = (): void => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: AxiosResponse<ApiResponse>) => {
        const res = response.data;
        if (res.access_token) {
          setToken(res.access_token);
        }
        setProfileData({
          profile_name: res.name,
          profile_email: res.email,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  const getUserProjects = (): void => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/projects/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: AxiosResponse<Project[]>) => {
        setProjects(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  const openPDF = (filePath: string) => {
    window.open(filePath, "_blank");
  };

  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setUpdatedCode(project.code_file);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentProject) {
          axios({
            method: "PUT",
            url: `http://127.0.0.1:5000/update_project`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              project_id: currentProject.id,
              code_file: updatedCode,
            },
          })
            .then(() => {
              Swal.fire("Saved!", "", "success");
              setIsEditing(false);
              setCurrentProject(null);
              getUserProjects();
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                Swal.fire("Error!", "There was an error saving the changes.", "error");
              }
            });
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleDeleteClick = (projectId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the project.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: `http://127.0.0.1:5000/delete_project/${projectId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            Swal.fire('Deleted!', 'The project has been deleted.', 'success');
            getUserProjects();
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
              Swal.fire('Error!', 'There was an error deleting the project.', 'error');
            }
          });
      }
    });
  };

  return (
    <>
      <NavBar token={handleToken} />
      <div className="container mt-4">
        <br />
        {profileData && (
          <div className="card mb-4">
            <div className="card-header bg-dark text-white">
              {profileData.profile_name}
            </div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{profileData.profile_email}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">{profileData.about_me}</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            {projects.map((project) => (
              <div className="card mb-4" key={project.id}>
                <div className="card-header bg-dark text-white">
                  Project ID: {project.id}
                </div>
                <div className="card-body text-center">
                  <pre className="card-text">{project.code_file}</pre>
                  <div className="btn-group" role="group" aria-label="Project Actions">
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        openPDF(`http://127.0.0.1:5000/pdf/${email}/${project.id}/input.pdf`)
                      }
                    >
                      Voir input
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleEditClick(project)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(project.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  {project.linK_output_file}
                </div>
              </div>
            ))}
          </div>
        )}

        {isEditing && currentProject && (
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Project Code</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setIsEditing(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <CodeMirror
                    value={updatedCode}
                    height="200px"
                    extensions={[python(), oneDark]}
                    onChange={(value) => setUpdatedCode(value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveClick}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
