import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Blog = lazy(() => import("../pages/Blog/Blog"));
const AddBlog = lazy(() => import("../pages/Blog/AddBlog"));

export const allRoutes = [
    {
        path: "/admin/dashboard",
        element: <Dashboard />,
        title: "Dashboard",
    },
    {
        path: "/admin/blog",
        element: <Navigate to="/admin/blog" replace />,
        title: "Blog",
        submodules: [
            {
                path: "/admin/blog/view-blog",
                element: <Blog componentTitle={"Blog"} />,
                title: "Blog",
            },
            {
                path: "/admin/blog/add-blog",
                element: <AddBlog componentTitle={"Blog"} />,
                title: "Blog",
            },
            {
                path: "/admin/blog/edit-blog/:blogId",
                element: <AddBlog componentTitle={"Blog"} />,
                title: "Blog",
            },
        ],
    },
];
