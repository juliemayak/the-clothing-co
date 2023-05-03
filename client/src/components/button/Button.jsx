import "./button.scss";

const Button = ({ text, className, onClick, type, isDisabled }) => {
  return (
    <button
      type={type}
      className={`button ${className ? className : ""} ${isDisabled ? "_disabled" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
