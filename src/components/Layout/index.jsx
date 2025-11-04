
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ErrorBoundary from "../ErrorBoundary";
import GlobalErrorHandler from "../GlobalErrorHandler";
import Loader from "../Loader";
import { Suspense } from 'react';

const Layout = () => {
    return (
        <Suspense fallback={<Loader />}>
            <div className="bg-[#f0f0ff]">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Header />

                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 inter">
                                <ErrorBoundary>
                                    <GlobalErrorHandler />
                                    <Outlet />
                                </ErrorBoundary>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};
export default Layout