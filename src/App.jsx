import './App.css';
import Layout from './Layout';
import { Fragment, useEffect, useState } from 'react';
import { Routes, Navigate } from 'react-router-dom';
import { Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageTitle from './components/PageTitle';
import useLocalStorage from './hooks/useLocalStorage';
import { LOCAL_STORAGE } from './constant';
import Blog from './pages/Blog';
import AddBlog from './pages/AddBlog';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(LOCAL_STORAGE.IS_AUTHENTICATED, false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem(LOCAL_STORAGE.USER);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [setIsAuthenticated]);

  return (
    <Fragment>

      {/* {isAuthenticated ? ( */}
      <Layout>
        <Routes>
          <Route path="/dashboard" element={
            <Fragment>
              <PageTitle title="Mindclaire | Dashboard" /> <Dashboard />
            </Fragment>
          } />

          <Route path="/blog"
            element={
              <Fragment>
                <PageTitle title="Mindclaire | Blog List" /> <Blog />
              </Fragment>
            }
          />
          <Route path="/blog/add-blog"
            element={
              <Fragment>
                <PageTitle title="Mindclaire | Add Blog" /> <AddBlog />
              </Fragment>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Fragment>
  );
};

export default App