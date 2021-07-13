import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import CallPage from "./components/CallPage/CallPage";
import NoMatch from "./components/NoMatch/NoMatch";
import Thankyou from "./components/Thankyou/Thankyou";

// We imported all the pges and assigned paths to them

function App() {
  return (
    <Router>
      <Switch>

        {/* ///// this is for homepage ///// */}
        <Route exact path="/">
          <HomePage />
        </Route>
        {/* //////////////////////////////// */}

        {/* ///// this is for callpage ///// */}
        <Route exact path="/:id">
          <CallPage />
        </Route>
        {/* //////////////////////////////// */}

        {/* ///// this is for thankspage ///// */}
        <Route exact path="/:id/thanks/">
          <Thankyou />
        </Route>
        {/* //////////////////////////////// */}

        {/* ///// this is for errorpage ///// */}
        <Route path="/*/*/">
          <NoMatch />
        </Route>
        {/* //////////////////////////////// */}

      </Switch>
    </Router>
  );
}

export default App;