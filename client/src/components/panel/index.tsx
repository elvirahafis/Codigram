import Button from "./button";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getlistuser } from "../../actions/useractions";
import { useAppSelector, useAppDispatch } from "../../reducer/hooks";
import axios from "axios";
interface JwtPayload {
  username: string;
  exp: number;
  id: any;
  image: any;
}
const Panel = () => {
  const token: any = localStorage.getItem("access_token");
  const decodedToken = jwtDecode<JwtPayload>(token);
  const { getlistuserResult, getlistuserLoading, getlistuserError } =
    useAppSelector((state) => state.users);
  const [image, setImage] = useState();
  const [username, setUsername] = useState();
  const t = [getlistuserResult];
  const dispatch = useAppDispatch();

  const getdatauser = async () => {
    const response = await axios.get(
      `http://localhost:3001/profil/${decodedToken.id}`
    );
    const data = await response.data.data_codigram;

    setUsername(data.username);
    setImage(data.image);
  };
  useEffect(() => {
    dispatch(getlistuser());
    getdatauser();
  }, [dispatch]);
  return (
    <section className="w-[22rem] hidden lg:block lg:fixed ml-[30.5rem] space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 cursor-pointer">
            <img
              className="w-full"
              src={`http://localhost:3001/profiluser/${image}`}
              alt="Random Guy"
            />
          </div>

          <div>
            <h2 className="font-semibold text-md">
              <h3 className="font-semibold text-md">{username}</h3>
            </h2>
          </div>
        </div>

        <Button>Profil</Button>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-md">This is my Account Codigram</h1>
      </div>
    </section>
  );
};

export default Panel;
