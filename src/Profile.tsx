import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import NavBar from "./NavBar";

interface ProfileProps {
  token: string;
  setToken: (token: string) => void;
}


interface ProfileData {
  profile_name: string;
  profile_email: string;
  about_me: string;
}

interface ApiResponse {
  name: string;
  email: string;
  about: string;
  access_token?: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [token, setToken] = useState<string>("");

  const handleToken = () => {
    setToken("");
  };


  useEffect(() => {
    getUsers();
  }, []);

  const email = localStorage.getItem('email');

  function getUsers(): void {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response: AxiosResponse<ApiResponse>) => {
      console.log(response);
      const res = response.data;
      if (res.access_token) {
        props.setToken(res.access_token);
      }
      setProfileData({
        profile_name: res.name,
        profile_email: res.email,
        about_me: res.about
      });
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  const imgs: string[] = [
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
  ];

  return (
    <>      
          <NavBar token={handleToken} />


          <div className="container">
            <br></br>
    
            {profileData && (
             <div className="alert alert-dark " role="alert">
             <h4 className="alert-heading">{profileData.profile_name}</h4>
             <p>{profileData.profile_email}</p>
             <p className="mb-0">{profileData.about_me}</p>
           </div>  )}
     
    </div></>
  );
};

export default Profile;

