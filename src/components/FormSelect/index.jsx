import Select from 'react-select';

const customStyles = {
  menu: (styles) => ({
    ...styles,
    // This solution is not the best. And in production it should be replace on more appropriate way
    zIndex: 2,
  }),
};

const FormSelect = ({
  form,
  field,
  onChange,
  disabled = false,
  autoSelectCityAndSpeciality,
  ...props
}) => {
  const changeField = (option) => {
    props?.handleSelectValue && props.handleSelectValue(option);

    // NOTE: set city and speciality if doctor selected and they are empty
    if (
      field?.name === 'doctorName' &&
      !form.values.doctorSpeciality.length &&
      !form.values.city.length
    ) {
      const { doctorsCity, doctorSpeciality } = autoSelectCityAndSpeciality(
        option,
        props?.cities,
        props?.doctorSpecialities,
      );

      form.setFieldValue('city', doctorsCity);
      form.setFieldValue('doctorSpeciality', doctorSpeciality);
    }

    if (onChange) onChange(option, field.name, form);
    else form.setFieldValue(field.name, option);
  };

  return (
    <Select
      {...props}
      {...field}
      disable={disabled}
      form={form}
      onChange={changeField}
      styles={customStyles}
    />
  );
};

export default FormSelect;
