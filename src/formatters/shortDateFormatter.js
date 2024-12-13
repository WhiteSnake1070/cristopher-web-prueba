import moment from 'moment';

const shortDateFormatter = date => moment(date.slice(0, 10)).format('DD/MM/yyyy')

export default shortDateFormatter;
