import { Routes, Route } from "react-router-dom";
import SideBar from "../components/SideBar";
// import Footer from "../components/Footer";
import companyPageData from "../data/companyPageData";
//subpages
import JobOffer from "./company/JobOffer";
import JobApplication from "./company/JobApplication";
import Interview from "./company/Interview";
import Home from "./company/Home";

const Company = () => {
  return (
    <div className="w-full h-full pb-40">
      <SideBar
        bgColor="#E0F6FF"
        aciveBgColor="#0B5498"
        activeFontColor="white"
        menuItems={companyPageData.menuItems}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/joboffer" element={<JobOffer />} />
        <Route path="/jobapplication" element={<JobApplication />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
      {/* <Gallery imgData={companyPageData.gallary} />
      <Welcome /> */}
      {/* <Footer footerData={companyPageData.footerData} /> */}
    </div>
  );
};

export default Company;
