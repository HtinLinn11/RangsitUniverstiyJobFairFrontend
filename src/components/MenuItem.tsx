import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import LanguageSwitch from "../utils/languageSwitch";

interface Props {
  activeBgColor: string;
  activeFontColor: string;
  handleClose: () => void;
  menuItems: Array<{ title: string; subPageUrl: string }>;
}
const MenuItem = ({
  handleClose,
  menuItems,
  activeBgColor,
  activeFontColor,
}: // handleLoginClick,
Props) => {
  const location = useLocation();
  const { t } = useTranslation();
  let navigate = useNavigate();
  const handleClick = (subPageUrl: string) => {
    handleClose();
    console.log(subPageUrl);
    navigate(subPageUrl);
  };
  const { handleOnClickEng, handleOnClickTh, currentLanguage } =
    LanguageSwitch();
  //delete later for controlling active language
  console.log(currentLanguage);

  return (
    <div className="flex flex-col items-center w-full gap-2 text-base">
      {menuItems.map((item, index) => (
        <span
          key={index}
          className="bg-slate-200 text-slate-500 flex items-center gap-6 px-5 w-full p-2 text-center rounded-lg hover:text-white hover:bg-slate-500 focus:text-white focus:bg-slate-500 cursor-pointer"
          style={{
            backgroundColor:
              location.pathname === item.subPageUrl ? activeBgColor : "",
            color: location.pathname === item.subPageUrl ? activeFontColor : "",
          }}
          onClick={() => handleClick(item.subPageUrl)}
        >
          {t(`subMenu.${item.title}`)}
        </span>
      ))}
      <div className="absolute bottom-20 flex gap-16 items-center">
        <img
          src="/rsu-jobfair-logo.jpg"
          alt="JobFair Logo"
          className="w-10 rounded-full"
        />
        <Link to={"/"} className="underline">
          Login
        </Link>
        <div>
          <a
            className="border-e-2 border-zinc-900 px-1"
            onClick={handleOnClickEng}
          >
            Eng
          </a>
          <a className=" px-1" onClick={handleOnClickTh}>
            Thai
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
