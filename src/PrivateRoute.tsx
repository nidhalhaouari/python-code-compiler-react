import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactElement;
  token: string | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, token }) => {
  // Vérifiez si le token existe pour autoriser l'accès à l'élément ou rediriger vers la page de connexion
  return token ? element : <Navigate to="/" />;
};

export default PrivateRoute;
