import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { theme } from "./styling/Theme";
import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { Layout } from "./styling/Layout";
import CardWizard from "./wizard/CardWizard";
import "./animation.css";
import { RecoilRoot } from "recoil";
import { QueryParamProvider } from "use-query-params";
import { AnimatedSwitch } from "react-router-transition";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./home/Home";
import Badge from "./badge/Badge";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/graphql",
});

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
              <CssBaseline />
              <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
              >
                <Route path="/wizard*" exact>
                  <Layout>
                    <CardWizard />
                  </Layout>
                </Route>
                <Route path="/internalBadgeHtml*" exact>
                  <Badge />
                </Route>
                <Route path="/">
                  <Layout>
                    <Home />
                  </Layout>
                </Route>
              </AnimatedSwitch>
            </QueryParamProvider>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
