import React from 'react';
import moment from 'moment';

function DateFormatter({ value, format = 'DD-MMM-YYYY hh:mm' }) {
   
    return (
        <>
            {value ?
                <span>{moment(value).format(format)}</span>
                :
                <span></span>
            }
        </>
    )
}

export default DateFormatter;