import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import store from "./Store/store";
import { Provider } from "react-redux";
import Upgrade from "./components/Upgrade";
import { NextUIProvider } from "@nextui-org/react";
function App() {
  return (
    <>
      <Provider store={store}>
        <NextUIProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/Upgrade" element={<Upgrade />} />

                <Route path="/feed" element={<Feed />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </NextUIProvider>
      </Provider>
    </>
  );
}

export default App;
