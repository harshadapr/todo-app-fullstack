import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import Todo from "./pages/Todo";
import NotFound from "./pages/404";
import AddTaskModal from "./pages/AddTask";

const data = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/add-task",
    element: <AddTaskModal />
  },
];

export default function AllRoutes() {
  return (
    <Routes>
      {data.map((obj, idx) => {
        return <Route element={obj.element} path={obj.path} />;
      })}
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
