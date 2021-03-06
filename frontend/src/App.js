import "./App.css";
import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { Fragment } from "react";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";
import "./web";
import { testQuery } from "./apollo/queries";
import Footer from "./components/common/Footer";


function App() {
  // useEffect(async () => {
  //   await testQuery();
  // }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Home />
        </Fragment>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
