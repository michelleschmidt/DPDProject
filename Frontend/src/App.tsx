import { useState } from "react";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";

import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DocSearch from "./DocSearchScreen";
import Booking from "./Booking";
import DocFind from "./DocFindScreen";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DocSearch />} />
      <Route path="/find" element={<DocFind />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  </Router>
);

export default App;

/*
function App() {
  let items = ["San Francisco", "New York", "Sweden", "London", "Paris"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const [alertVisible, setAlertVisbility] = useState(false);
  return (
    <div>
      <Header />
      <div>
        {" "}
        <ListGroup
          items={items}
          heading="Cities"
          onSelectItem={handleSelectItem}
        ></ListGroup>{" "}
      </div>
      <div>
        <Form></Form>
      </div>
      <div>
        {alertVisible && (
          <Alert onClose={() => setAlertVisbility(false)}>
            <b>Hello WORLD</b>
          </Alert>
        )}
        <Button color="secondary" onClick={() => setAlertVisbility(true)}>
          Next
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
*/
