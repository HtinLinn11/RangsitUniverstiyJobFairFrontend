import Social from "./Social";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
interface Props {
  footerData: {
    logoUrl: string;
    contactTitle: string;
    contactEmail: string;
    copyRight: string;
  };
}
const footerColor = {
  main: "#ff8c00",
  company: "#0B5498",
  student: "#EE962E",
  aj: "#5A7131",
};
const Footer = ({ footerData }: Props) => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div
      className="w-full flex flex-col gap-5 lg:flex-row items-center lg:justify-between lg:gap-0 p-5 mt-5 text-slate-300 relative lg:sticky bottom-0"
      style={{
        backgroundColor:
          location.pathname === "/"
            ? footerColor.main
            : location.pathname === "/company" ||
              location.pathname === "/company/joboffer" ||
              location.pathname === "/company/jobapplication" ||
              location.pathname === "/company/interview"
            ? footerColor.company
            : location.pathname === "/student" ||
              location.pathname === "/student/jobs" ||
              location.pathname === "/student/interview"
            ? footerColor.student
            : location.pathname === "/aj" ||
              location.pathname === "/aj/jobapprove" ||
              location.pathname === "/aj/interview"
            ? footerColor.aj
            : "#ff8c00",
        justifyContent: location.pathname.includes("aj") ? "space-around" : "",
      }}
    >
      <img
        src={footerData.logoUrl}
        alt="rsu-jobfair-logo"
        className="w-20 rounded-full"
      />
      {!location.pathname.includes("aj") && (
        <div className="text-center">
          <h5 className="text-lg font-medium">
            {t(`${footerData.contactTitle}`)}
          </h5>
          {/* mailto:webmaster@example.com */}
          <a href="#" className="underline">
            {footerData.contactEmail}
          </a>
        </div>
      )}

      <p className="text-center">{footerData.copyRight}</p>
      {!location.pathname.includes("aj") && <Social />}
    </div>
  );
};

export default Footer;
