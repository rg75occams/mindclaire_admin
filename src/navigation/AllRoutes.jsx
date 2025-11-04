import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Blog = lazy(() => import("../pages/Blog/Blog"));
const AddBlog = lazy(() => import("../pages/Blog/AddBlog"));

export const allRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard />,
        title: "Dashboard",
    },
    {
        path: "/blog",
        element: <Navigate to="/blog" replace />,
        title: "Blog",
        submodules: [
            {
                path: "/blog",
                element: <Blog componentTitle={"Blog"} />,
                title: "Blog",
            },
            {
                path: "/blog/add-blog",
                element: <AddBlog componentTitle={"Blog"} />,
                title: "Blog",
            },
            {
                path: "/blog/edit-blog/:blogId",
                element: <AddBlog componentTitle={"Blog"} />,
                title: "Blog",
            },
        ],
    },
];
