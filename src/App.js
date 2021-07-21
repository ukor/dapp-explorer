import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Spinner from "./components/spinner";

const LandingPage = lazy(() => import("./pages/landingPage"));
const AddressDetailsPage = lazy(() => import("./pages/address/addressDetails"));
const TxHashPage = lazy(() => import("./pages/txHash/txDetails"));

function App() {
  return (
    <Suspense fallback={<Spinner message='building page...' />}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/address'>
            <AddressDetailsPage />
          </Route>
          <Route exact path='/txHash'>
            <TxHashPage />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
