// const Button = (props) => {
//   return (
//     <button
//       data-btnstyles={props.btnstyles}
//       className="btn__"
//       onClick={props.click}
//     >
//       {props.text}
//     </button>
//   );
// };

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
