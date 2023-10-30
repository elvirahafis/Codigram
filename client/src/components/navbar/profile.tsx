import { jwtDecode } from "jwt-decode";

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
      <img
        className="w-full"
        src={`http://localhost:3001/profiluser/${decodedToken.image}`}
        alt={decodedToken.id}
      />
    </div>
  );
};

export default Profile;
