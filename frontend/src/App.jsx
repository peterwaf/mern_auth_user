import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./componets/SignUpForm";
import LoginForm from "./componets/LoginForm";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <div className="bg-[url('/images/pexels-veeterzy-114979.jpg')] bg-cover h-screen w-screen text-200">
       <BrowserRouter>
          <Routes>
          <Route index element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/sign-up" element={<SignUpForm/>} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
