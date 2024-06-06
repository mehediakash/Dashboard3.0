import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login";
import MainLayout from "./LayOut/MainLayout";
import Singup from "./Pages/Singup";
import Home from "./Pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/singup" element={<Singup />}></Route>
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
