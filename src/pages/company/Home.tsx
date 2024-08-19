import Gallery from "../../components/company/Gallery";
import Welcome from "../../components/company/Welcome";
import companyPageData from "../../data/companyPageData";

const Home = () => {
  return (
    <div className="w-full h-dvh">
      <Gallery imgData={companyPageData.gallary} />
      <Welcome />
    </div>
  );
};

export default Home;
