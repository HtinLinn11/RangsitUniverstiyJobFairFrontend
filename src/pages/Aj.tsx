import { Routes, Route } from "react-router-dom";
import SideBar from "../components/SideBar";
import ajPageData from "../data/ajPageData";
//subpages
import Home from "./aj/Home";
import JobApprove from "./aj/JobApprove";
import Interview from "./aj/Interview";
const Aj = () => {
  return (
    <div className="w-full h-full pb-16">
      <SideBar
        bgColor="#E7EEDA"
        aciveBgColor="#5A7131"
        activeFontColor="white"
        menuItems={ajPageData.menuItems}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobapprove" element={<JobApprove />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </div>
  );
};

export default Aj;
