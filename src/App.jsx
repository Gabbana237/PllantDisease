import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import PlantDiseaseDetection from "./pages/PlantDiseaseDetection";
import UserDashboard from "./pages/UserDashboard";
import { Outlet } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";

// Layout avec outlet
const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes avec Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
            <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          {/* Routes protégées */}
          <Route
            path="/detection"
            element={
             
                <PlantDiseaseDetection />
             
            }
          />
        
        </Route>

        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
           <Route path="/email-verification" element={<EmailVerification />} />
           <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
