import React from "react";
import NavRoutes from "./Routes/NavRoutes";
import Navbar from "./components/Navbar";
import SearchBar from "./partials/SearchBar";

const App = () => {
  return (
    <>
      <Navbar />
      <SearchBar />

      <NavRoutes />
    </>
  );
};

export default App;
