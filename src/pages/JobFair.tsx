import NavBar from "../components/NavBar";
import Title from "../components/Title";
// import Footer from "../components/Footer";
import Welcome from "../components/Welcome";
import Cards from "../components/Cards";
import Separator from "../components/Separator";
import mainPageData from "../data/mainPageData";

const Main = () => {
  return (
    <div className="w-full">
      <NavBar logoUrl={mainPageData.logoUrl} />
      <Title>mainTitle</Title>
      <Cards cardData={mainPageData.cardData} />
      <Separator />
      <Welcome welcomeData={mainPageData.welcomeData} />
      {/* <Footer footerData={mainPageData.footerData} /> */}
    </div>
  );
};

export default Main;
