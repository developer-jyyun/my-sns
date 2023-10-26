import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
      <ul>
        <li>dddd</li>
        <li>dddd</li>
        <li>dddd</li>
        <li>dddd</li>
        <li>dddd</li>
      </ul>
    </>
  );
}

export default App;
