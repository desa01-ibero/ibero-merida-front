const FormikInput = ({ field, form: { touched, errors }, label, placeholder, type = 'text', helperText, className = '' }) => {
  const hasError = touched[field.name] && errors[field.name];

  return (
    <div className={`input ${className}`}>
      <label className="input__label " htmlFor={field.name}>{label}</label>
      <div className={`input__wrapper ${hasError ? 'error' : ''}`}>
        <input
          {...field}
          id={field.name}
          type={type}
          className={`input__field ${hasError ? 'error' : ''}`}
          placeholder={placeholder}
          aria-label={label}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={`${field.name}-helper`}
        />
      </div>
      {hasError && <div id={`${field.name}-helper`} className="input__help-text error">{errors[field.name]}</div>}
      {!hasError && helperText && <div id={`${field.name}-helper`} className="input__help-text">{helperText}</div>}
    </div>
  );
};

export default FormikInput;