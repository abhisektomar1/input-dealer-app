import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OtpVerify from "./pages/auth/OtpVerify";
import ServiceList from "./pages/dashboard/services/ServiceList";
import UserProfile from "./pages/dashboard/profile/UserProfile";
import WinnerList from "./pages/dashboard/WinnerList";
import NewProduct from "./pages/dashboard/product/NewProduct";
import ProductList from "./pages/dashboard/product/ProductList";
import EditProduct from "./pages/dashboard/product/EditProduct";
import NewPassword from "./pages/auth/NewPassword";
import AddWarehouse from "./pages/dashboard/warehouse/AddWarehouse";
import AuthGuard from "./AuthGuard";
import RootRedirect from "./AuthGuard/RootDirector";
import InventoryList from "./pages/dashboard/inventory/InventoryList";
import SampleProduct from "./pages/dashboard/product/SampleProduct";  
import NewProducts from "./pages/dashboard/product/NewProducts";
import GovSchemes from "./pages/dashboard/scheme/GovSchemes";
import ViewGovScheme from "./pages/dashboard/scheme/ViewGovScheme";
import Farmer from "./pages/dashboard/farmer/Farmer";
import AddFarmer from "./pages/dashboard/farmer/AddFarmer";
import SaleList from "./pages/dashboard/sale/SaleList";
import AddSale from "./pages/dashboard/sale/AddSale";
import CustomerList from "./pages/dashboard/CustomerList";
import PurchaseList from "./pages/dashboard/PurchaseList";
import SupplierList from "./pages/dashboard/SupplierList";
import ShopDetails from "./pages/dashboard/profile/ShopDetails";
import ShopEdit from "./pages/dashboard/profile/ShopEdit";
import { useEffect } from "react";
import CursorTrailCanvas from "./components/CursorAnimation";
import Dashboard from "./pages/dashboard/Dashboard";
import ChangePassword from "./pages/auth/ChangePassword";

function App() {


  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* Root Route */}
          <Route path="/" element={<RootRedirect />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/NewPassword/:email" element={<NewPassword />} />
          <Route path="/otpVerify/:email" element={<OtpVerify />} />
          <Route path="/changePassword" element={<ChangePassword />} />


          {/* Protected Routes */}
          <Route element={<AuthGuard />}>
          <Route path="/dashboard/home" element={<Dashboard />} />
            <Route path="/dashboard/userProfile" element={<UserProfile />} />
            <Route path="/dashboard/winners" element={<WinnerList />} />
            <Route path="/dashboard/serviceList" element={<ServiceList />} />
            <Route path="/dashboard/CustomerList" element={<CustomerList />} />
            <Route path="/dashboard/PurchaseList" element={<PurchaseList />} />
            <Route path="/dashboard/SupplierList" element={<SupplierList />} />
            <Route path="/dashboard/ShopEdit" element={<ShopEdit />} />


            <Route path="/dashboard/newProduct" element={<NewProduct />} />
            <Route path="/dashboard/newProducts/:id" element={<NewProducts />} />
            <Route path="/dashboard/productList" element={<ProductList />} />
            <Route path="/dashboard/productEdit/:id" element={<EditProduct />} />
            <Route path="/dashboard/newWarehouse" element={<AddWarehouse />} />
            <Route path="/dashboard/inventoryList" element={<InventoryList />} />
            <Route path="/dashboard/SamplePRoducts" element={<SampleProduct />} />

            <Route path="/dashboard/governmentSchemes" element={<GovSchemes />} />
            <Route path="/dashboard/governmentSchemes/:id" element={<ViewGovScheme />} />

            <Route path="/dashboard/farmer" element={<Farmer />} />
            <Route path="/dashboard/addFarmer" element={<AddFarmer />} />

            <Route path="/dashboard/sale" element={<SaleList />} />
            <Route path="/dashboard/addSale" element={<AddSale />} />


          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
