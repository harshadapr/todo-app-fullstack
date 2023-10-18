import env from "react-dotenv";
import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./AllRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const currentPath = window.location.pathname;
  console.log(env.REACT_APP_BACKEND_URL);

  return (
    <div className="h-screen">
      <AllRoutes />
    </div>
  );
}

export default App;
