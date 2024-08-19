import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-72 px-8 lg:px-52">
      <h3 className="text-3xl mb-3">{t("Company.Main.title")}</h3>
      <p className="text-justify">{t("Company.Main.description")}</p>
    </div>
  );
};

export default Welcome;
