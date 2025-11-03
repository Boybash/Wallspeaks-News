import React from "react";

const Button = (props) => {
  return (
    <button
      data-btnstyles={props.btnstyles}
      className="btn__"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
