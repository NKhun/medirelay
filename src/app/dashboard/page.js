"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียน components ของ Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

// ----- 1) ฟังก์ชันสร้างคลื่น EKG, Pleth, Resp (เบื้องต้น) -----
function ekgWave(t) {
  // พารามิเตอร์การสร้างคลื่นแบบ Gaussian (P, Q, R, S, T)
  const A_p = 0.125, sigma_p = 0.15, p_pos = 0.12;  // P wave เล็กและกว้างนิดหน่อย
  const A_q = -0.35, sigma_q = 0.015, q_pos = 0.26; // Q wave เป็นรอยบุ๋มเล็กๆ
  const A_r = 1.0, sigma_r = 0.008, r_pos = 0.18;  // R wave สูงสุดและคม
  const A_s = -0.3, sigma_s = 0.015, s_pos = 0.23; // S wave ต่ำลงตาม R wave
  const A_t = 0.3, sigma_t = 0.05, t_pos = 0.4;   // T wave อยู่ช่วงหลังสุด

  const period = 850; // 850ms ต่อการเต้น 1 ครั้ง
  const x = t % period;
  // fraction คือสัดส่วนเวลาใน 1 beat (0 ถึง 1)
  const fraction = x / period;

  // ฟังก์ชัน Gaussian ธรรมดา
  function gauss(x, mu, sigma) {
    return Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
  }

  // รวมคลื่น P, Q, R, S, T
  let val = 0;
  val += A_p * gauss(fraction, p_pos, sigma_p);
  val += A_q * gauss(fraction, q_pos, sigma_q);
  val += A_r * gauss(fraction, r_pos, sigma_r);
  val += A_s * gauss(fraction, s_pos, sigma_s);
  val += A_t * gauss(fraction, t_pos, sigma_t);

  // เน้น QRS ถ้าเป็นด้านบวก
  if (val > 0) {
    val = Math.pow(val, 2);
  }

  return val;
}


function plethWave(t) {
  const period = 900; 
  const x = t % period;

  let val = Math.sin((2 * Math.PI * x) / period);
  if (val > 0) val = Math.pow(val, 3);

  // random noise
  val += Math.random() * 0.02;
  return val * 0.8;
}

function respWave(t) {
  // Resp (การหายใจ) ช้ากว่า: ~12-18 BPM
  const period = 4000;
  const x = t % period;

  let val = 0.4 * Math.sin((2 * Math.PI * x) / period); 
  // noise
  val += Math.random() * 0.02; 
  return val;
}

//สร้าง component GraphChart สำหรับแสดง 1 กราฟ
function GraphChart({ color, waveFunc }) {
  // เก็บ data 80 จุด
  const [time, setTime] = useState(0);
  const [chartData, setChartData] = useState({
    labels: Array(60).fill(""),
    datasets: [
      {
        label: "Wave",
        data: Array(60).fill(0),
        borderColor: color,
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  });

  // อัปเดตข้อมูลทุก 50 ms
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 50);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // เมื่อ time เปลี่ยน => คำนวณค่า wave ใหม่ แล้ว shift array
  useEffect(() => {
    const nextVal = waveFunc(time);
    setChartData((prev) => {
      const oldData = prev.datasets[0].data;
      return {
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: [...oldData.slice(1), nextVal], // shift 1 ตัว แล้ว push ค่าล่าสุด
          },
        ],
      };
    });
  }, [time, waveFunc]);

  return (
    <div className="w-full h-full">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { display: false },
            y: { display: false },
          },
          elements: { point: { radius: 0 } },
          animation: { duration: 0 },
          legend: {display:false}, // ปิด animation ของ chart.js เพื่อ real-time
        }}
      />
    </div>
  );
}

// dashboard layout
export default function Dashboard() {
  const [aiOpen, setAiOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const [sys, setSys] = useState(120);
  const [dia, setDia] = useState(82);
  const [last, setLast] = useState(89);

  // อัปเดตเลข BP/ค่าอื่น ๆ ทุก 5 วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setSys(Math.floor(110 + Math.random() * 20)); // 110-130
      setDia(Math.floor(70 + Math.random() * 20));  // 70-90
      setLast(Math.floor(90 + Math.random() * 10)); // 80-100
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#1c1d21] flex flex-col md:flex-row overflow-hidden">
      <div className="h-[60%] w-full md:h-full md:w-[75%] grid grid-rows-2 md:grid-rows-4 grid-cols-2 md:grid-cols-4 divide-y-2 divide-y-reverse divide-x-2 divide-gray-800">
        
        {/* Green Graph (EKG) + Green Number */}
        <div className="md:col-span-3 md:flex hidden items-center justify-center">
          {/* ใส่กราฟ EKG */}
          <GraphChart color="#00ff00" waveFunc={ekgWave} />
        </div>
        <div className="text-[#46f56f] text-[5em] col-span-1 flex items-center justify-center gap-8">
          <div className="flex flex-col text-[1.6rem]">
            <p>ECG</p>
            <p>88</p>
            <p>64</p>
          </div>
          76 {/* ตัวเลขสมมติ เช่น HR */}
        </div>

        {/* Blue Graph (Pleth) + Blue Number */}
        <div className="md:col-span-3 md:flex hidden items-center justify-center">
          {/* ใส่กราฟ Pleth */}
          <GraphChart color="#0fe0f3" waveFunc={plethWave} />
        </div>
        <div className="text-[#0fe0f3] text-[5em] col-span-1 flex items-center justify-center gap-8">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[1.6rem]">SpO2</p>
            <p>84</p>
          </div> {/* ตัวเลขสมมติ เช่น SpO2 */}
        </div>

        {/* Yellow Graph (Resp) + Yellow Number */}
        <div className="md:col-span-3 md:flex hidden items-center justify-center">
          {/* ใส่กราฟ Resp */}
          <GraphChart color="#f5fa05" waveFunc={respWave} />
        </div>
        <div className="text-[#f5fa05] text-[5em] col-span-1 flex items-center justify-center gap-8">
        <div className="flex flex-col justify-center items-center">
            <p className="text-[1.6rem]">RR</p>
            <p>18</p>
          </div>
          
        </div>

        {/* Red Number (BP) */}
        <div className="md:col-span-2 text-red-500 md:flex hidden items-center justify-center">
          {/* บน */}
          <span className="text-[5em]">
            {sys}/{dia}
          </span>
        </div>
        <div className="md:col-span-2 text-red-500 flex items-center justify-center border-t-2 border-gray-800">
          {/* ล่าง */}
          <span className="text-[5em]">({last})</span>
        </div>
      </div>

      {/* ===== ส่วนขวา (MAP + AI SUM + PTT) ===== */}
      <div className="w-full h-[40%] md:h-full md:w-[25%] flex md:flex-col">
      <div className={`absolute w-full md:relative md:opacity-100 md:translate-x-0 h-[38%] flex items-center justify-center duration-300 ease-in-out transition-all bg-white ${mapOpen ? "opacity-100 translate-x-0" : " opacity-0 translate-x-[-80%]"}`}>
        <div className="md:absolute bottom-2 left-0 rounded-r-md z-10 p-4 font-bold text-white bg-green-800 shadow-md shadow-gray-500">
          ETA : 2 minutes
          </div>
        <Image src="/map.png" width={1080} height={1080} className="md:w-[100%] aspect-square" />
      </div>
        <div
          className={`absolute bg-white md:opacity-100 md:translate-x-0 md:relative h-[40%] w-full md:w-full md:h-[40%] flex flex-col items-center justify-start duration-300 ease-in-out transition-all 
            ${aiOpen ? "opacity-100 translate-x-0" : " opacity-0 translate-x-[-80%]"}`}>
          <div className="w-full h-15 bg-gray-100 border-b-1 font-semibold text-gray-800 border-gray-200 flex items-center px-4 gap-4">
            <Image src="/ai-profile.png" width={40} height={40} alt="profile"/>
            AI summarization
          </div>
        </div>
        
        <div className="bg-white w-full md:h-[22%] h-full flex flex-col-reverse md:flex-col items-center justify-center border-t-1 border-gray-200 gap-3 p-1 ">
          <div className="text-[1.8rem] md:text-[1rem]">mic off</div>
          <div className="h-[60%] aspect-square flex justify-center items-center bg-radial hover:bg-radial from-red-400 hover:from-red-700 from-40% hover:from-30% to-red-500 hover:to-red-400 text-white rounded-[50%] shadow-lg shadow-red-300 hover:shadow-red-400/50 cursor-pointer">
            <Image src="/mic-off.png" width={30} height={30} alt="mic-off"/>
          </div>
        </div>
      </div>

      {/* ===== ปุ่มกด Toggle AI ===== */}
      <div className="absolute bottom-[20%]">
        <div className="relative gap-2 flex flex-col items-center justify-center">
          <div
          id="burgeraisum"
          className="flex md:hidden items-center justify-center text-center text-white w-[50px] h-[40px] bg-red-700 rounded-r-lg"
          onClick={() => setAiOpen(!aiOpen)}
          >
          AI
          </div>
      {/* ===== ปุ่มกด Toggle Map ===== */}
      <div
            id="burgeraisum"
            className="flex md:hidden items-center justify-center text-center text-white w-[50px] h-[40px] bg-green-700 rounded-r-lg"
            onClick={() => setMapOpen(!mapOpen)}
          >
          Map
        </div>
        </div>
      </div>
      
    </div>
  );
}
