// ! packages
import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { LazyMotion, domAnimation, AnimatePresence, m } from "framer-motion";

// ! styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/index.scss";

// ! components
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import ChangeHead from "../components/ChangeHead";

// ! data
import { menuPages, allPages } from "../utils/pages";
import animations from "../utils/animations";
import axios from "axios";
import url from "../path.json";

const App = ({ Component, pageProps, router }: AppProps) => {
  // ! App states
  const [account, setAccount] = useState(false);
  const [accountDetail, setAccountDetail] = useState({
    id: 0,
    username: "",
    email: "",
    pictureUrl: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [sessionUuid, setSessionUuid] = useState("null");

  useEffect(() => {
    if (sessionUuid !== "null") {
      axios({
        method: "POST",
        url: url.serverPath + "/check/user",
        data: {
          token: sessionUuid,
        },
      }).then(res => {
        if (res.data.error === false) {
          setAccountDetail(res.data.data);
        }
      });
    }
  }, [sessionUuid]);

  return (
    <div className="app">
      <ChangeHead pages={allPages} />
      <Header
        account={account}
        accountDetails={account === true ? accountDetail : null}
        setSearchValue={setSearchValue}
      />
      <div className="app-container">
        <Navigation pages={menuPages} />
        <div className="page">
          <LazyMotion features={domAnimation}>
            <AnimatePresence exitBeforeEnter={false}>
              <m.div
                key={router.route.concat(animations.name)}
                className="page__container"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animations.variants}
                transition={animations.transition}
              >
                <Component
                  {...pageProps}
                  searchValue={searchValue}
                  account={account}
                  setAccount={setAccount}
                  sessionUuid={sessionUuid}
                  setSessionUuid={setSessionUuid}
                />
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </div>
      </div>
    </div>
  );
};

export default App;
