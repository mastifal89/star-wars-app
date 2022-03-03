import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login";
import { AuthContext } from './auth/authContext';
import { useEffect, useReducer } from "react";
import { authReducer } from "./auth/authReducer";
import { AppRouter } from "./routers/AppRoutes";

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false }
}

function App() {

  const [ user, dispatch ] = useReducer(authReducer, {}, init); 

  useEffect(() => {
    if(!user) return;

    localStorage.setItem('user', JSON.stringify(user))
  }, [user])
  
 
  return (
      <AuthContext.Provider value={{
        user,
        dispatch
      }} >
        <AppRouter />
      </AuthContext.Provider>
  );
}

export default App;
