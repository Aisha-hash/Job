const InputBox = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  labelClassName,
  inputClassName,
  ...props
}) => {
  return (
    <>
      <div className="flex items-center space-x-4 my-5">
        <label
          htmlFor={id}
          className={`text-md font-medium w-40 text-right text-lg  ${labelClassName}`}
        >
          {label}
        </label>
        <div className="flex flex-1 flex-col ">
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className={`p-2 border text-md border-gray-300 bg-stone-100 rounded-md mr-6 ${inputClassName}`}
            {...props}
          />
          {props.err && <p className="text-red-600 text-sm m-1">{props.err}</p>}
        </div>
      </div>
    </>
  );
};

export default InputBox;
