'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  
  const [hospital_formData, setHospitalFormData] = useState({
    email: "",
    password: "",
    name: "",
    location: "",
  });

  const [ems_formData, setEmsFormData] = useState({
    email: "",
    password: "",
    carNumber: "",
    role: "",
  });

  const hospital_handleChange = (e) => {
    setHospitalFormData({ ...hospital_formData, [e.target.name]: e.target.value });
  };

  const ems_handleChange = (e) => {
    setEmsFormData({ ...ems_formData, [e.target.name]: e.target.value });
  };

  const hospitalhandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/hospital_signup", hospital_formData); // เชื่อม API
      if (res.status === 201) {
        alert("สมัครสมาชิกสำเร็จ!");
        router.push("/login"); // ไปหน้า Login
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("สมัครสมาชิกไม่สำเร็จ");
    }
  };

  const emshandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/ems_signup", ems_formData); // เชื่อม API
      if (res.status === 201) {
        alert("สมัครสมาชิกสำเร็จ!");
        router.push("/login"); // ไปหน้า Login
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("สมัครสมาชิกไม่สำเร็จ");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={hospitalhandleSubmit}>
        <input type="text" name="name" placeholder="Hospital name" onChange={hospital_handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={hospital_handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={hospital_handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={emshandleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={ems_handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={ems_handleChange} required />
        <input type="text" name="carNumber" placeholder="เลขทะเบียน" onChange={ems_handleChange} required />
        <input type="text" name="role" placeholder="ตำแหน่ง" onChange={ems_handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
