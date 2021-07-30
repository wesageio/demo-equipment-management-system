import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'ra-core';
import moment from 'moment';

import { Line, LineChart, XAxis, CartesianGrid, Tooltip, YAxis } from 'recharts';

export const GraphList = ({style}) => {
    const [users, setUsers] = useState([]);
    const [year, setYear] = useState('2021')
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
                    position: 'absolute',
                    top: '5px',
                    width: '200px',
                    padding: '0px',
                    fontSize: '20px',
                    borderRadius: '5px',
                    right: '20px',
                    backgroundColor: 'transparent',
                }}
                value={year}
                onChange={(e) => setYear(e.target.value)}
            >
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
            </select>
            <LineChart
                width={600}
                height={400}
                data={usersList}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <YAxis />
                <XAxis dataKey="month" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" key={0} dataKey='Total' stroke='green' yAxisId={0} />
            </LineChart>
        </div>
    )
};