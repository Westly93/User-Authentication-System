import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";
import store from "./store";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import PasswordReset from "./containers/PasswordReset";
import PostDetail from "./containers/PostDetail";
import PasswordResetConfirm from "./containers/PasswordResetConfirm";
import Activate from "./containers/Activate";
import Profile from "./containers/Profile";
import Layout from "./hocs/Layout";
function App() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <Layout>
        <AnimatePresence>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<PasswordResetConfirm />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Provider>
  );
}

export default App;
