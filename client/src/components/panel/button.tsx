import { useNavigate } from "react-router-dom";
import { generatePath } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;

  // whatever else is in the JWT.
}
interface IProps {
  children: React.ReactNode;
  blacked?: boolean;
}

const Button = ({ children, blacked = false }: IProps) => {
  const token: any = localStorage.getItem("access_token");
  const decodedToken = jwtDecode<JwtPayload>(token);
  const navigate = useNavigate();
  const detailuser = () => {
    decodedToken.id &&
      navigate(generatePath("/profil/:id", { id: decodedToken.id }));
  };
  return (
    <button
      onClick={detailuser}
      className={`text-xs text-blue-500 font-semibold ${
        blacked ? "text-black" : "text-blue-500"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
