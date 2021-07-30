import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { useHistory} from "react-router-dom";

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g style={{cursor: 'pointer'}}>
            <text x={cx} y={cy} dy={8} fontSize="25" textAnchor="middle" fill="#7d7676">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill="#41928b"
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill="#41928b"
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke="#41928b"
                fill="none"
            />
            <circle cx={ex} cy={ey} r={5} fill="#41928b" stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`Total ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const handleClick = (props, history) => {
    const { payload } = props;
    history.push({
        pathname: '/properties',
        search: 'status',
        state: { status : payload.payload.name }
    });
}

export const PieChartList = ({data}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const history = useHistory();
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <PieChart width={600} height={400} style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                isAnimationActive={true}
                cx={310}
                cy={200}
                onClick={(props) => handleClick(props, history)}
                paddingAngle={2}
                style={{cursor: 'pointer'}}
                innerRadius="50%"
                outerRadius="70%"
                fill="#4b923c"
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
        </PieChart>
    );
}
