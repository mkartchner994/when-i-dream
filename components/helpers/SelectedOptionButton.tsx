const SelectedOptionButton = ({ children, selected, ...rest }) => {
  return (
    <button
      {...rest}
      className={`border-2 shadow hover:shadow-md transition-shadow duration-200 rounded-full py-2 px-6 text-lg ${
        selected ? "bg-green-600 text-green-100" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default SelectedOptionButton;
