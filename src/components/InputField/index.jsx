import { TextField } from '@mui/material';
import { get } from 'lodash';

const FormInput = ({
  form,
  field,
  externalError = null,
  type = 'text',
  disabled,
  className,
  ...props
}) => {
  const { touched, errors, setFieldValue } = form;

  const handleChange = (event) => {
    const value = event.target.value;
    setFieldValue(field.name, value);
    props.onChange && props.onChange(field.name, value, form);
  };

  const hasError =
    externalError === null
      ? Boolean(get(touched, field.name) && get(errors, field.name))
      : Boolean(externalError);
  const helperText = hasError ? get(errors, field.name) : undefined;

  return (
    <TextField
      {...field}
      {...props}
      type={type}
      onChange={handleChange}
      helperText={props.helperText ? props.helperText : helperText}
      error={hasError}
      disabled={disabled}
      className={className}
    />
  );
};
export default FormInput;
