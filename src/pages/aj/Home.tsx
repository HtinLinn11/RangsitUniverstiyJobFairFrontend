import { useTranslation } from "react-i18next";

const Aj = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full h-dvh">
      <h2 className="text-slate-500 font-semibold text-7xl pt-24">
        {t("commingSoon.aj")}
      </h2>
    </div>
  );
};

export default Aj;
