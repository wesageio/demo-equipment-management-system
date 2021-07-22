import React, { Pagination } from 'react-admin';

export const RowsPerPage = props => {
    const count = props.count;
    const difference = Math.floor(props.count / 2);
    const max = count + difference;
    const min = count - difference;
    const maxCount = Math.round(max / 10) * 10;
    const minCount = Math.round(min / 10) * 10;

    return(
        <Pagination rowsPerPageOptions={[minCount === 0 ? 1 : minCount,count,maxCount]} />
    );
};
