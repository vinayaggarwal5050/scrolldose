import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CPProvider } from "./global-states/CPProvider";
import { Header } from "./components/Header";
import { SideBar } from "./components/Sidebar";
import { DashBoard } from "./pages/DashBoard";
import { AddProduct } from "./pages/products/AddProduct";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import LandingPage from "./pages/landing-page/LandingPage";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

const DashboardLayout = () => {
  return (
    <div style={{ margin: 0, padding: 0, display: "flex", backgroundColor: "#e5e7eb" }}>
      <SideBar />
      <div style={{ flexGrow: 1 }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <CPProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Dashboard Routes with Layout */}
          <Route element={<ProtectedRoute />}>  {/* 🔒 Wraps everything inside /cp */}
            <Route path="/cp" element={<DashboardLayout />}>
              <Route index element={<DashBoard />} /> {/* `/cp` renders Dashboard */}
              <Route path="store/add-product" element={<AddProduct />} /> {/* `/cp/store/add-product` */}
            </Route>
          </Route>

          {/* Redirect unknown paths */}
          <Route path="*" element={<Page404/>} />
        </Routes>
      </Router>
    </CPProvider>
  );
}

export default App;
