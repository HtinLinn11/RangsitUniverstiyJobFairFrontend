import { Link } from "react-router-dom";

interface Props {
  pathUrl: string;
  children: string;
}

function Button({ children, pathUrl }: Props) {
  return (
    <Link
      to={pathUrl}
      className="bg-amber-600 rounded-md min-w-28 min-h-8 text-white text-center cursor-pointer flex items-center justify-center hover:bg-[#ff8c00]"
    >
      {children}
    </Link>
  );
}
export default Button;
