import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { CPProvider } from "./global-states/CPProvider";
import { Header } from "./components/Header";
import { SideBar } from "./components/Sidebar";
import { DashBoard } from "./pages/DashBoard";

import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import LandingPage from "./pages/landing-page/LandingPage";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import StoreSettings from "./pages/store/StoreSettings";
import StudioSettings from "./pages/studio/StudioSettings";
import AddVideo from "./pages/studio/AddVideo";
import AllVideos from "./pages/studio/AllVideos";
import UploadVideo from "./pages/studio/UploadVideo";
import VideoPlayer from "./pages/studio/VideoPlayer";
import AllCategories from "./pages/store/AllCategories";
import AddProduct from "./pages/store/AddProduct";

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
          <Route element={<ProtectedRoute />}>
            <Route path="/cp" element={<DashboardLayout />}>
              <Route index element={<DashBoard />} /> 

              <Route path="settings/store-settings" element={<StoreSettings />} />
              <Route path="settings/studio-settings" element={<StudioSettings />} />

              <Route path="store/add-product" element={<AddProduct />} /> 
              <Route path="store/all-categories" element={<AllCategories />} />


              <Route path="studio/add-video" element={<AddVideo />} />
              <Route path="studio/upload-video" element={<UploadVideo />} />
              <Route path="studio/all-videos" element={<AllVideos />} />
              <Route path="studio/player" element={<VideoPlayer />} />
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
