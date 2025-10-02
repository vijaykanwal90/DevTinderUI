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
import Chat from "./components/Chat"; 
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <NextUIProvider>
          <BrowserRouter>
            <Routes>
              {/* Define the layout route for the Body component */}
              <Route path="/" element={<Body />}>
                {/* These are the inner routes that will be rendered inside the Body */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/feed" element={<Feed />} />
              </Route>
              
              {/* Other routes without the Body component */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upgrade" element={<Upgrade />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </NextUIProvider>
      </Provider>
    </>
  );
}

export default App;
