import Feed from "./components/feed";
import Layout from "./components/layout";
import Panel from "./components/panel";
import StoryBoard from "./components/story-board";
import store from "./reducer/index";
import Login from "./components/Login/Login";
import Signup from "./components/Register/register";
import { DetailP } from "./components/detailuser/profil";
import { Profile } from "./components/profil/profil";
import Editpost from "./components/Posting/editpost";
import Edituser from "./components/profil/edituser";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadFile from "./components/Posting/createpost";
import Detailposting from "./components/Posting/detaiposting";
const App: React.FC = ({}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Signup />} />
          <Route path="/posting" element={<UploadFile />} />
          <Route path="/profil/:id?" element={<Profile />} />
          <Route path="/Detail/:id" element={<DetailP />} />
          <Route path="/editpostingan/:id" element={<Editpost />} />
          <Route path="/edituser/:id" element={<Edituser />} />
          <Route path="/Detailpostingan/:id" element={<Detailposting />} />
          <Route
            path="/home"
            element={
              <Layout>
                <div className="space-y-3 lg:mx-0">
                  <StoryBoard />
                  <Feed />
                </div>
                <Panel />
              </Layout>
            }
          ></Route>
          <Route
            path="/search/:id"
            element={
              <Layout>
                <div className="space-y-3 lg:mx-0">
                  <StoryBoard />
                  <Feed />
                </div>
                <Panel />
              </Layout>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
