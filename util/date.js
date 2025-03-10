import moment from "moment";

export function getDateMinusDays(days) {
    // return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
    return moment().subtract(days, "days");
}

export function formateDate(date, dateFormat = 'YYYY-MM-DD') {
    return moment(date).format(dateFormat);
}

export function getSystemDateFormat(){
    return moment.localeData().longDateFormat('L');
}

export function getDate(dateString, dateFormat = 'YYYY-MM-DD'){
    return moment(dateString, dateFormat);
}
