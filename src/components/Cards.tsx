import { Card } from "flowbite-react";

import Button from "./Button";
import { useTranslation } from "react-i18next";
interface Props {
  cardData: Array<{
    imgUrl: string;
    altText: string;
    buttonText: string;
    pathUrl: string;
  }>;
}
function Cards({ cardData }: Props) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 my-7">
      {cardData.map((cardItem, index) => (
        <Card
          className="min-w-[350px] md:min-w-[530px] flex-grow lg:min-w-[200px] lg:max-w-48 p-2 md:border-2 rounded-md shadow-sm hover:shadow-xl transition-shadow delay-100 items-center gap-3"
          renderImage={() => (
            <img
              className="lg:w-9/12 w-32 bg-[#b7b7b7] p-3 rounded-full shadow-lg shadow-[#a1a1a1] object-cover"
              src={cardItem.imgUrl}
              alt="image 1"
            />
          )}
          key={index}
        >
          <Button pathUrl={cardItem.pathUrl}>
            {t(`cardButton.${cardItem.buttonText}`)}
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default Cards;
//{t("jobFair.title")}
