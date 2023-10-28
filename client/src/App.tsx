import Feed from "./components/feed";
import Layout from "./components/layout";
import Panel from "./components/panel";
import StoryBoard from "./components/story-board";
import store from "./reducer/index";
import { Provider } from "react-redux";
const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <div className="space-y-3 lg:mx-0">
          <StoryBoard />
          <Feed />
        </div>
        <Panel />
      </Layout>
    </Provider>
  );
};

export default App;
