import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { theme } from "./styling/Theme";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { Layout } from "./styling/Layout";
import Presenter from "./presenter/Presenter";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Layout>
          <Switch>
            <Redirect path="/" to="/presenter" exact={true} />
            <Route path="/presenter">
              <Presenter />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
