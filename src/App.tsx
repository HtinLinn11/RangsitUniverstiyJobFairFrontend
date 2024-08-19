import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import mainPageData from "./data/mainPageData";
//Language switch function
import LanguageSwitch from "./utils/languageSwitch";
//pages
import JobFair from "./pages/JobFair";
import Company from "./pages/Company";
import Student from "./pages/Student";
import Aj from "./pages/Aj";
//footer
import Footer from "./components/Footer";

const pageBgColor = {
  main: "white",
  company: "#E0F6FF",
  student: "#FFF4E3",
  aj: "#E7EEDA",
};
function App() {
  const { handleOnClickEng, handleOnClickTh, currentLanguage } =
    LanguageSwitch();

  const location = useLocation();
  return (
    <div
      style={{
        backgroundColor:
          location.pathname === "/"
            ? pageBgColor.main
            : location.pathname === "/company" ||
              location.pathname === "/company/joboffer" ||
              location.pathname === "/company/jobapplication" ||
              location.pathname === "/company/interview"
            ? pageBgColor.company
            : location.pathname === "/student" ||
              location.pathname === "/student/jobs" ||
              location.pathname === "/student/interview"
            ? pageBgColor.student
            : location.pathname === "/aj" ||
              location.pathname === "/aj/jobapprove" ||
              location.pathname === "/aj/interview"
            ? pageBgColor.aj
            : "white",
      }}
    >
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        handleOnClickEng={handleOnClickEng}
        handleOnClickTh={handleOnClickTh}
      />
      <Routes>
        <Route path="/" element={<JobFair />} />
        <Route path="/company/*" element={<Company />} />
        <Route path="/student/*" element={<Student />} />
        <Route path="/aj/*" element={<Aj />} />
      </Routes>
      <Footer footerData={mainPageData.footerData} />
    </div>
  );
}

export default App;
