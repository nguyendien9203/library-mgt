// Guard.js
import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../component/context/AuthContext';

export const ProtectedRoute = ({ element: Component }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUserAuthenticated } = useAuth();

  const authenticated = isUserAuthenticated();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthReady(true);

    if (!authenticated) {
      navigate('/', { replace: true, state: { from: location } });
    }
  }, [authenticated, navigate, location]);

  if (!authReady) {
    return null;
  }

  return authenticated ? Component : null;
};

export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUserAuthenticated, isAdmin } = useAuth();

  const authenticated = isUserAuthenticated();
  const admin = isAdmin();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthReady(true);

    if (!authenticated || !admin) {
      navigate('/', { replace: true, state: { from: location } });
    }
  }, [authenticated, admin, navigate, location]);

  if (!authReady) {
    return null;
  }

  return authenticated && admin ? Component : null;
};

export const LibrarianRoute = ({ element: Component }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUserAuthenticated, isLibrarian } = useAuth();

  const authenticated = isUserAuthenticated();
  const librarian = isLibrarian();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthReady(true);

    if (!authenticated || !librarian) {
      navigate('/', { replace: true, state: { from: location } });
    }
  }, [authenticated, librarian, navigate, location]);

  if (!authReady) {
    return null;
  }

  return authenticated && librarian ? Component : null;
};
