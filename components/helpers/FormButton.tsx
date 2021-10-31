const FormButton = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="border-2 shadow hover:shadow-md transition-shadow duration-200 rounded py-2 px-6 text-lg"
    >
      {children}
    </button>
  );
};

export default FormButton;
