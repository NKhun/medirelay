"use client";
import Navbar from "../../components/navbar_home";
import { useState } from "react";

export default function DoctorSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // ถ้าผิดพลาด (เช่น password ไม่ถูกต้อง)
        alert("Sign in failed");
        return;
      }

      const data = await res.json();
      // ทำงานหลังจาก sign in สำเร็จ เช่น redirect หรือเก็บ token
      alert(`Welcome, ${data.name}`);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar/>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg w-[400px] max-w-sm rounded-xl flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-3">Sign In</h2>
        <div className="mb-4 w-full px-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border-2 border-gray-200 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
          />
        </div>
        <div className="w-full mb-4 px-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border-2 border-gray-200 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>
        
        <div className="w-full mb-4 px-4">
          <label htmlFor="" className="block font-medium mb-1">
            Role
          </label>
          <select
            id="select"
            className="w-full p-2 border-2 border-gray-200 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          >
            <option value="doctor">Doctor</option>
            <option value="hospital">Hospital</option>
            <option value="ems">Ems</option>
          </select>
        </div>
        <hr className="w-[85%] mb-4 border-gray-200"/>
        <button
          type="submit"
          className="w-[30%] mt-4 cursor-pointer text-white p-2 rounded-lg bg-red-800 hover:bg-red-700 shadow-lg shadow-red-300/0 hover:shadow-red-300/80 duration-300 transition-all ease-in-out"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
