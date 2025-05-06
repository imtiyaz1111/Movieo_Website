import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UpdatePassword from "../pages/auth/UpdatePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : ":explore",
                element : <ExplorePage/>
            },
            {
                path : ":explore/:id",
                element : <DetailsPage/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "update-password",
                element : <UpdatePassword/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            }
        ]
    }
])

export default router