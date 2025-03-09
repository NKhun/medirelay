import Link from "next/link";
import Navbar from "../components/navbar_home";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Navbar/>
      <div className="flex items-center justify-center h-[calc(100vh-74px)] w-screen mt-[74px]">
        <div className="flex flex-col items-center justify-center w-[80%] h-[80%] rounded-2xl shadow-2xl shadow-red-300 bg-[#fdfdfd] text-black border-3 border-red-200/50">
          <h1 className="text-[8em] text-center font-bold text-red-800">Medirelay</h1>
          <p className="text-[1em] w-[70%] text-center text-gray-800">Medirelay เป็นแพลตฟอร์มที่ช่วยให้โรงพยาบาลได้รับข้อมูลผู้ป่วยฉุกเฉินล่วงหน้าจากหน่วยฉุกเฉิน (EMS) แบบเรียลไทม์ ผ่าน
            แพลตฟอร์มที่ช่วยให้โรงพยาบาลได้รับข้อมูลผู้ป่วยฉุกเฉินล่วงหน้าจากหน่วยฉุกเฉิน EMS แบบเรียลไทม์ ผ่าน
            ระบบดิจิทัล ช่วยให้แพทย์สามารถเตรียมตัวได้อย่างรวดเร็ว ลดความล่าช้าในการรักษา และเพิ่มโอกาสรอดชีวิตของผู้ป่วย 
            โดยเฉพาะในกรณีที่ต้องการการช่วยเหลือภายใน Golden Time</p>
          <Link href="/signup" className="text-[1.3em] px-[15px] py-[5px] rounded-lg bg-red-800 hover:bg-red-700 shadow-red-300/40 hover:shadow-red-300/80 hover:scale-103 text-white font-medium shadow-lg duration-300 ease-in-out mt-6">สมัครเลย</Link>
        </div>
      </div>
    </div>
  );
}
