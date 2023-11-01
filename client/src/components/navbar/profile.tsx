import { jwtDecode } from "jwt-decode";
import { Outlet, Link } from "react-router-dom";

interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;
  // whatever else is in the JWT.
}
const Profile = () => {
  const token: any = localStorage.getItem("access_token");
  console.log(token, "123");
  const decodedToken = jwtDecode<JwtPayload>(token);
  return (
    <div className="rounded-full overflow-hidden w-6 h-6 cursor-pointer">
      <Link to="/">
        <img
          className="w-full"
          src={`http://localhost:3001/profiluser/${decodedToken.image}`}
          alt={decodedToken.id}
        />
      </Link>
      <Outlet />
    </div>
  );
};

export default Profile;
