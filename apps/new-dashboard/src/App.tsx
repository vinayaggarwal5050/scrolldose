import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./components/Header"
import { SideBar } from "./components/Sidebar"
import { DashBoard } from "./pages/DashBoard";
import { AddProduct } from "./pages/products/AddProduct";


function App() {


  return (
    <Router>
      <div style={{margin: 0, padding: 0, display: "flex",  backgroundColor: "#e5e7eb"}}>
        <SideBar/>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/store/add-product" element={<AddProduct />} />
        </Routes>
        </div>
      </div>
    </Router>

  )
}

export default App
