import { Button } from "@material-ui/core";
import React from "react";

const SearchChar = (props) => {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  //   const testFunc = (e) => {};
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name="fromName"
      className="center"
    >
      <label className="searchForm">
        <span className="searchTag">Search Characters: </span>
        <input autoComplete="off" type="text" name="searchTerm" onChange={handleChange} />
        {/* <Button className="Search" onClick={handleChange}>
          Search
        </Button> */}
        {/* <Button onClick */}
      </label>
    </form>
  );
};

export default SearchChar;
