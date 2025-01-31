import React from "react";
import Card from "./Elements/Card";
import styles from "./App.css";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Home from "./pages/Home";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Header />
//       <div style={{ display: "flex" }}>
//         <Sidebar />
//         <div style={{ flexGrow: 1 }}>

//           <Routes>
//             <Route path="/" element={<Home />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

const App: React.FC = () => {
  return (
    <div>
      <Card/>
    </div>
  )
}

export default App;
