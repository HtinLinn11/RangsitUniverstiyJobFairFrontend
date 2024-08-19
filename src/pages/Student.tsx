import { Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";
import studentPageData from "../data/studentPageData";
//subpages
import Home from "./student/Home";
import Jobs from "./student/Jobs";
import Interview from "./student/Interview";

const Student = () => {
  return (
    <div className="w-full h-full pb-16">
      <SideBar
        bgColor="#FFF4E3"
        aciveBgColor="#EE962E"
        activeFontColor="white"
        menuItems={studentPageData.menuItems}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </div>
  );
};

export default Student;
