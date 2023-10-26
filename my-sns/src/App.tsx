import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./firebase";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { styled } from "styled-components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setTimeout(() => setIsLoading(false), 2000);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
${reset};
*{box-sizing: border-box;}
body{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
  color:#fff;
  background:#5fa578;
}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
`;
