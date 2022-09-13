import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'ra-core';
import moment from 'moment';

import { Line, LineChart, XAxis, CartesianGrid, Tooltip, YAxis } from 'recharts';

export const GraphList = ({ style }) => {
    const [users, setUsers] = useState([]);
    const currentYear = (new Date()).getFullYear();
    const [year, setYear] = useState(currentYear.toString());
    const years = Array.from(new Array(20), (val, index) => index + currentYear);
    const dataProvider = useDataProvider();
    useEffect(async () => {
        const { data } = await dataProvider.getList('properties', {
            pagination: {},
            sort: { field: 'purchaseDate', order: 'ASC' },
            filter: { purchaseDate: moment(new Date(year)).format('YYYY-MM-DD') }
        })
        setUsers(data)
    }, [year]);
    const usersList = [];
    users.forEach((item) => {
        const alreadyHas = usersList.find((date) => date.month === moment(item.purchaseDate).format('MMMM'))
        if (alreadyHas) {
            Object.assign(alreadyHas, { 'Total': item.purchaseCost + alreadyHas.Total })
        } else {
            usersList.push({
                month: moment(item.purchaseDate).format('MMMM'),
                'Total': item.purchaseCost
            })
        }
    });

    return (
        <div style={style}>
            <select
                style={{
                    width: '200px',
                    padding: '0px',
                    fontSize: '20px',
                    borderRadius: '5px',
                    backgroundColor: 'transparent',
                }}
                value={year}
                onChange={(e) => setYear(e.target.value)}
            >
                {
                    years.map((year, index) => {
                        return <option key={`year${index}`} value={year}>{year}</option>
                    })
                }
            </select>
            <LineChart
                width={600}
                height={400}
                data={usersList}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <YAxis />
                <XAxis dataKey="month" />
                <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value) + ' դր․'}/>
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" key={0} dataKey='Total' stroke='green' yAxisId={0} />
            </LineChart>
        </div>
    )
};