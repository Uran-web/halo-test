import { TextField } from '@mui/material';
import { get } from 'lodash';

const FormInput = ({
  form,
  field,
  externalError = null,
  type = 'text',
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
      ? !!(get(touched, field.name) && get(errors, field.name))
      : !!externalError;
  const helperText = hasError ? get(errors, field.name) : undefined;

  return (
    <TextField
      // NOTE: mixed props from different places is not good idea. However, as a simple example it will be appropriate
      {...field}
      {...props}
      type={type}
      onChange={handleChange}
      helperText={props.helperText || helperText}
      error={hasError}
      className={className}
    />
  );
};
export default FormInput;
