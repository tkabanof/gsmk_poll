const FormControl = ({
  className,
  label,
  labelTag,
  htmlFor,
  children,
  error
}) => {
  const addAllClasses = ["form-control"];
  if (error) {
    addAllClasses.push("has-error");
  }
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <div className={addAllClasses.join(" ")}>
      {label && (
        <div
          className="field-label"
          as={labelTag}
          htmlFor={htmlFor}
          content={label}
        />
      )}
      {children}
      {error && <div className="feedback">{error}</div>}
    </div>
  );
};


export default FormControl;
