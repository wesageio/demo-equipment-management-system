import * as moment from 'moment';
import { decode } from 'jsonwebtoken';

export const filterForQuery = (filter: any) => {
    if (filter.hasOwnProperty('q')) {
        if (filter.hasOwnProperty('employee')) {
            return {
                $where: `JSON.stringify(this).indexOf('${filter.q.replace(/"|'/g, '')}')!=-1`,
                $and: [{ "employee": null }],
                authorId: filter['authorId'],
            };
        }
        return {
            $where: `JSON.stringify(this).indexOf('${filter.q.replace(/"|'/g, '')}')!=-1`,
            authorId: filter['authorId'],
        };
    } else {
        Object.keys(filter).map((key: string) => {
            if (!isNaN(filter[key])) {
                return filter[key];
            } else
                if (filter.hasOwnProperty('property') || filter.hasOwnProperty('organization')) {
                    return [filter[key]];
                }  else {
                    const date = moment(filter[key], 'YYYY-MM-DD', true);
                    if (date.isValid()) {
                        filter[key] = {
                            $gte: moment(filter[key]).format('YYYY-01-01 00:mm:ss:SSS'),
                            $lt: moment(filter[key]).format('YYYY-12-30 24:mm:ss:SSS'),
                        };
                    }
                }
        });
        return filter;
    }
};

export const getUserIdFromToken = (token) => {
    const userId = decode(token.replace(/^Bearer\s+/, '')).sub;
    return userId.toString();
};
