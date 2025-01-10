// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
   //style landing page with tailwindcss
    <div className="bg-black bg-opacity-40 h-screen text-200 w-1/2  mx-auto p-2 flex flex-col justify-center align-center">
      <div className=" bg-white flex flex-col justify-center align-center mx-auto w-3/4 sm:w-1/2 h-1/2 rounded p-5 ">
      <h1 className="text-2xl font-bold text-center">User Login System</h1>
      <span className="pt-2 pb-2 text-center font-bold">Don&apos;t have an account? <Link to ="/sign-up" className="text-purple-800 underline">Sign Up</Link></span>
      <span className="text-center font-bold">Already have an account? <Link to ="/login" className="text-purple-800 underline">LogIn</Link></span>
      </div>
      
    </div>
  )
}

export default Home