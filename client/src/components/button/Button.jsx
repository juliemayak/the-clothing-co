import "./button.scss";

const Button = ({ text, className, onClick, type }) => {
  return (
    <button type={type} className={`button ${className ? className : ""}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
