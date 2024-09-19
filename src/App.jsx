import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Layout from "./Components/Layout";
import ProductPreview from "./Components/ProductPreview";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products/:id",
        element: <ProductPreview />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer
      stacked 
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
