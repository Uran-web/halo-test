import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withStyles } from '@mui/styles';
import { addDays, format } from 'date-fns';

import { datePickerStyles } from './styles';

const CustomDatePicker = ({ field, form, classes, ...props }) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  const handleChangeData = (date) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    setFieldValue(name, date);
    if ('getDate' in props) {
      props.getDate && props.getDate(formattedDate);
    }
  };
  return (
    <DatePicker
      selected={value}
      onChange={(date) => handleChangeData(date)}
      placeholderText={props.label}
      maxDate={addDays(new Date(), 0)}
      monthsShown={2}
      dateFormat="dd/MM/yyyy"
      className={props.className}
      popperClassName={classes.popper}
      customInput={<input className={classes.input} />}
      {...props}
    />
  );
};

export default withStyles(datePickerStyles)(CustomDatePicker);
