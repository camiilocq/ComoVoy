import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home/Home";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" />
      <Route exact path="/sign-up" />
    </Switch>
  </Router>
);
export default routing;
