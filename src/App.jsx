import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import PlantDiseaseDetection from "./pages/PlantDiseaseDetection";
import UserDashboard from "./pages/UserDashboard";

// Layout standard avec Header et Footer
const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages avec Header et Footer */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/videos" element={<Layout><Videos /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/detection" element={<Layout><PlantDiseaseDetection /></Layout>} />
          <Route path="/dashboard" element={<Layout><UserDashboard /></Layout>} />

        {/* Pages sans Header/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;