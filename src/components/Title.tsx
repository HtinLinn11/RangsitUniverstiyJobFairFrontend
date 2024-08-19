import { useTranslation } from "react-i18next";

interface Props {
  children: string;
}

const Title = ({ children }: Props) => {
  const { t } = useTranslation();
  return (
    <h3 className="text-center mb-10 text-4xl font-bold p-6 underline underline-offset-[6px] decoration-solid decoration-4 decoration-orange-400 mt-11">
      {t(`jobFair.${children}`)}
    </h3>
  );
};

export default Title;
