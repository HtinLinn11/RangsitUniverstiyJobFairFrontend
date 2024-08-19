import { useTranslation } from "react-i18next";
interface Props {
  welcomeData: {
    imgUrl: string;
    imgAlt: string;
    title: string;
    text: string;
  };
}
const Welcome = ({ welcomeData }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 py-10 px-32 justify-center items-center lg:items-start">
      <div className="min-w-[350px] rounded-md  flex-grow p-3">
        <img
          src={welcomeData.imgUrl}
          alt={welcomeData.imgAlt}
          className=" rounded-md  "
        />
      </div>

      <div className="min-w-[350px] flex-grow">
        <h3 className="text-3xl font-bold pb-3 underline underline-offset-[6px] decoration-solid decoration-4 decoration-orange-400">
          {t("jobFair.title")}
        </h3>
        <p className="text-justify">{t("jobFair.description")}</p>
      </div>
    </div>
  );
};

export default Welcome;
