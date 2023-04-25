import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

// styles
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

// pages
import { Home } from './pages/Home/Home';
import { Store } from './pages/Store/Store';
import { Admin } from './pages/Admin/Admin';

// components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { BackToTop } from './components/BackToTop/BackToTop';
import { Announcement } from './components/Announcement/Announcement';

const Layout = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        draggable
        transition={Zoom}
        limit={3}
      />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
