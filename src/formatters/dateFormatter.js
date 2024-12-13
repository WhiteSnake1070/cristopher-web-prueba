import moment from 'moment';

const dateFormatter = date => moment(date).format('DD/MM/yyyy h:mm:ss')

export default dateFormatter;
