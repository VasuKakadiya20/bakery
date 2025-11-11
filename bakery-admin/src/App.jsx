// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Dashboard from "./pages/Deshbord/Deshbord";
// import Products from "./pages/product/product";
// import Header from "./components/Header/Header";
// import Settings from "./pages/Settings/Settings";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import SingleCategoryPage from "./pages/Categories/Categorieslist";
// import OrderList1 from "./pages/order/orderlist";
// import COrderList from "./pages/order/corder/Corderlist";
// import ADDCategoryPage from "./pages/Categories/Categories";
// import Login from "./pages/login/login";
// import { createContext, useState } from "react";
// import EditCategoryPage from "./pages/Categories/EditCategoryPage";
// import ProductTable from "./pages/product/productlist";
// import EditProduct from "./pages/product/EditProductPage";

// const mycontext = createContext();

// function App() {
//   const [islogin, setislogin] = useState(false);

//   const values = {
//     islogin,
//     setislogin,
//   };

//   return (
//     <BrowserRouter>
//       <mycontext.Provider value={values}>
//         {islogin ? (
//           <>
//             <Header />
//             <div className="app-container">
//               <Sidebar />
//               <div className="main-content">
//                 <Routes>
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/" element={<Dashboard />} />
//                   <Route path="/Deshbord" element={<Dashboard />} />
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/products" element={<Products />} />
//                   <Route path="/orderlist" element={<OrderList1 />} />
//                   <Route path="/corderList" element={<COrderList />} />
//                   <Route path="/productslist" element={<ProductTable />} />
//                   <Route path="/Categories" element={<ADDCategoryPage />} />
//                   <Route path="/editproduct/:id" element={<EditProduct />} />
//                   <Route path="/editcategory/:id" element={<EditCategoryPage />} />
//                   <Route path="/Categorieslist" element={<SingleCategoryPage />} />
//                   <Route path="*" element={<Navigate to="/" />} />
//                 </Routes>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="router">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//                <Route path="/Deshbord" element={<Dashboard />} />
//               <Route path="*" element={<Navigate to="/login" />} />
//             </Routes>
//           </div>
//         )}
//       </mycontext.Provider>
//     </BrowserRouter>
//   );
// }

// export default App;
// export { mycontext };

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Deshbord/Deshbord";
import Products from "./pages/product/product";
import Header from "./components/Header/Header";
import Settings from "./pages/Settings/Settings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleCategoryPage from "./pages/Categories/Categorieslist";
import OrderList1 from "./pages/order/orderlist";
import COrderList from "./pages/order/corder/Corderlist";
import ADDCategoryPage from "./pages/Categories/Categories";
import Login from "./pages/login/login";
import Signup from "./pages/sIngup/Singup";
import { createContext, useState } from "react";
import EditCategoryPage from "./pages/Categories/EditCategoryPage";
import ProductTable from "./pages/product/productlist";
import EditProduct from "./pages/product/EditProductPage";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const mycontext = createContext();

function App() {
  const [islogin, setislogin] = useState(false);

useEffect(() => {
  const adminData = localStorage.getItem("adminData");
  if (adminData) {
    setislogin(true);
  }
}, []);
  const values = { islogin, setislogin };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    <BrowserRouter>
      <mycontext.Provider value={values}>
        <Routes>
          <Route
            path="/login"
            element={
              islogin ? <Navigate to="/" /> : <Login />
            }
          />
          <Route 
          path="/singup" 
          element={ 
            islogin ? <Navigate to="/" /> : <Signup/> 
            } 
            />
          <Route
            path="/*"
            element={
              islogin ? (
                <>
                  <Header />
                  <div className="app-container">
                    <Sidebar />
                    <div className="main-content">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/Deshbord" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/orderlist" element={<OrderList1 />} />
                        <Route path="/corderList" element={<COrderList />} />
                        <Route path="/productslist" element={<ProductTable />} />
                        <Route path="/Categories" element={<ADDCategoryPage />} />
                        <Route path="/editproduct/:id" element={<EditProduct />} />
                        <Route path="/editcategory/:id" element={<EditCategoryPage />} />
                        <Route path="/Categorieslist" element={<SingleCategoryPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </mycontext.Provider>
    </BrowserRouter>
   <Toaster position="top-right" />
</>
  );
}

export default App;
export { mycontext };