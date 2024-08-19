import { useNavigate } from "react-router-dom";
interface Props {
  logoUrl: string;
}

const NavBar = ({ logoUrl }: Props) => {
  const navigate = useNavigate();
  return (
    <span
      className="fixed top-0 pt-4 ps-6 w-full bg-white block cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={logoUrl} alt="RSU logo" />
    </span>
  );
};

export default NavBar;
