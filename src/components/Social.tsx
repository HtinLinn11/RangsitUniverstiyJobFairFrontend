import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  YoutubeFilled,
  TikTokFilled,
} from "@ant-design/icons";

const Social = () => {
  return (
    <div className="flex gap-3 bg-white p-5 rounded-lg lg:shadow-md lg:shadow-gray-500">
      <a href="#">
        <FacebookFilled className="text-2xl text-[#0866ff]" />
      </a>
      <a href="#">
        <InstagramFilled className="text-2xl text-[#E1306C]" />
      </a>
      <a href="#">
        <LinkedinFilled className="text-2xl text-[#0077B5]" />
      </a>
      <a href="#">
        <YoutubeFilled className="text-2xl text-[#FF0000]" />
      </a>
      <a href="#">
        <TikTokFilled className="text-2xl text-[#010101]" />
      </a>
    </div>
  );
};

export default Social;
