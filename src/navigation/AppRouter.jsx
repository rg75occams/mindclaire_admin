import { Route, Routes } from "react-router-dom";
import { PublicRoutes, RequireAuth } from "../components/AuthChecker";
import { Suspense, lazy } from "react";
import NotFound from "../pages/NotFound";
import NotAllowed from "../pages/NotAllowed";
import Layout from "../components/Layout";
import { allRoutes } from "./AllRoutes";
import Loader from "../components/Loader";

const Login = lazy(() => import("../pages/auth/Login"));
const Test = lazy(() => import("../pages/Test"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));

const AppRouter = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>

                {allRoutes.map((route, index) =>
                    route?.submodules?.length > 0 ? (
                        route?.submodules?.map((subRoute, subIndex) => (
                            <Route key={index} element={<RequireAuth componentTitle={subRoute?.title} />}>
                                <Route key={subIndex} path={subRoute?.path} element={subRoute?.element} />
                            </Route>
                        ))
                    ) : (
                        <Route key={index} element={<RequireAuth componentTitle={route?.title} />}>
                            <Route path={route?.path} element={route?.element} />
                        </Route>
                    )
                )}
                
                <Route path="/test" element={<Layout />}>
                    <Route index element={<Test />} />
                </Route>

                <Route path="/not-allowed" element={<Layout />}>
                    <Route index element={<NotAllowed />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

export default AppRouter