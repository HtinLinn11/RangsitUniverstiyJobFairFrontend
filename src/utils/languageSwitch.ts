import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const {
    i18n: { changeLanguage },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("Eng");
  const handleOnClickEng = () => {
    changeLanguage("en");
    setCurrentLanguage("Eng");
  };
  const handleOnClickTh = () => {
    changeLanguage("th");
    setCurrentLanguage("Th");
  };
  return { handleOnClickEng, handleOnClickTh, currentLanguage };
};

export default LanguageSwitch;
