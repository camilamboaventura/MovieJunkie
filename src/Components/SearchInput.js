import React from "react";

function SearchInput(props) {
  return (
    <div className="container d-flex justify-content-center input-group my-3">
      <input
        type={props.type}
        className="form-control col col-lg-5"
        placeholder={props.placeHolder}
        aria-label={props.ariaLabel}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id={props.id}
        onClick={props.handleClick}
      >
        Submit
      </button>
    </div>
  );
}

export default SearchInput;
