import { Carousel } from "antd";

interface Props {
  imgData: Array<{
    imgUrl: string;
  }>;
}

const Gallery = ({ imgData }: Props) => (
  <div className="w-full md:w-5/6 lg:w-3/4 h-40 m-auto pt-24">
    <Carousel autoplay className="w-10/12 md:w-11/12 m-auto">
      {imgData.map((item, index) => (
        <div key={index} className="w-full">
          <img
            src={item.imgUrl}
            alt="gallery 1"
            className="object-cover w-full h-80 inline-block rounded-md"
          />
        </div>
      ))}
    </Carousel>
  </div>
);

export default Gallery;
