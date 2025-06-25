const Button = ({ children, className, ...props }) => {
  return (
    <button className={`btn btn-outline ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
