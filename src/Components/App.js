import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import SeeMoreDetails from "./SeeMoreDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/details/:location/:id" component={SeeMoreDetails} />
      </BrowserRouter>
    </div>
  );
}

export default App;
