import { useLocation } from "react-router-dom";
import { Dropdown } from "flowbite-react";
interface Props {
  currentLanguage: string;
  handleOnClickEng: () => void;
  handleOnClickTh: () => void;
}
function LanguageSwitcher({
  currentLanguage,
  handleOnClickEng,
  handleOnClickTh,
}: Props) {
  const differentColors = {
    aj: "#5A7131",
    student: "#EE962E",
    company: "#0B5498",
  };
  const location = useLocation();
  return (
    <div className="fixed w-16 top-8 right-4  md:right-6 z-50">
      <Dropdown
        label="Dropdown button"
        dismissOnClick={true}
        renderTrigger={() => (
          <span
            className=" text-white rounded-md px-5 py-2 cursor-pointer "
            style={{
              backgroundColor:
                location.pathname === "/company" ||
                location.pathname === "/company/joboffer" ||
                location.pathname === "/company/jobapplication" ||
                location.pathname === "/company/interview"
                  ? differentColors.company
                  : location.pathname === "/student" ||
                    location.pathname === "/student/jobs" ||
                    location.pathname === "/student/interview"
                  ? differentColors.student
                  : location.pathname === "/aj" ||
                    location.pathname === "/aj/jobapprove" ||
                    location.pathname === "/aj/interview"
                  ? differentColors.aj
                  : "#ff8c00",
            }}
          >
            {currentLanguage}
          </span>
        )}
        className="w-full text-center bg-[#c6c6c6] rounded-md outline-none"
      >
        <Dropdown.Item
          className="justify-center hover:outline-none rounded-md hover:bg-[#5f4519] hover:text-white"
          onClick={handleOnClickEng}
        >
          Eng
        </Dropdown.Item>
        <Dropdown.Item
          className="justify-center hover:outline-none rounded-md  hover:bg-[#5f4519] hover:text-white"
          onClick={handleOnClickTh}
        >
          Th
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}

export default LanguageSwitcher;
