import React, {
    useState,
    useEffect,
} from 'react';
import { useDataProvider } from 'react-admin';
import { useMediaQuery, Card, Link } from '@material-ui/core';
import DollarIcon from '@material-ui/icons/AttachMoney';

import packageJson from '../../../package.json';
import { Welcome } from './widgets/Welcome';
import { CardWithIcon } from './widgets/CardWithIcon';
import { GraphList } from './widgets/GraphList';
import { PieChartList } from './widgets/PieChart';
import constants from '../../resources/constants.js';


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
    card: {
        borderRadius: '10px',
        marginLeft: '10px',
        position: 'relative'
    }
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const getTotalCount = async (dataProvider, setCount, setPieChart) => {
    const { data } = await dataProvider.getList('properties', {
        pagination: {},
        sort: { field: 'purchaseCost', order: 'ASC' },
        filter: {},
    });

    const total = data.reduce((a, b) => {
        return a + b['purchaseCost'];
    }, 0);

    const counts = {};
    data.forEach((item) => { counts[item.status] = (counts[item.status] || 0) + 1; });
    const pieChartData = Object.keys(counts).map((key) => {
        return {
            name: key,
            value: counts[key]
        }
    });

    setPieChart(pieChartData);

    if (total === 0) {
        setCount('0');
    } else {
        setCount(total);
    }
}

const getSettingsData = async (dataProvider) => {
    const { data } = await dataProvider.getOne('settings', { id: constants.settingsId })
    if (data) {
        delete data.id;
        delete data._id;
        localStorage.setItem('settings', JSON.stringify(data));
    }
}

const Dashboard = () => {
    const [pieChart, setPieChart] = useState(null)
    const [count, setCount] = useState(null);
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('md')
    );
    useEffect(() => {
        getTotalCount(dataProvider, setCount, setPieChart);
        getSettingsData(dataProvider)
    }, [dataProvider]);

    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                <Welcome />
                <VerticalSpacer />
                <GraphList count={count} />
                <VerticalSpacer />
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
            <div style={styles.flex}>
                <CardWithIcon
                    to="/properties"
                    icon={DollarIcon}
                    title='Properties total cost'
                    subtitle={count}
                />
                <Spacer />
                <PieChartList data={pieChart} />
                <GraphList count={count} />
            </div>
        </div>
    ) : (
        <>
            <Welcome />
            <div style={styles.flex}>
                <div style={{ width: '50%', marginRight: '10px' }}>
                    <CardWithIcon
                        to="/properties"
                        icon={DollarIcon}
                        title='Properties total cost'
                        subtitle={count}
                    />
                    <PieChartList data={pieChart} />
                </div>
                <Card style={styles.card}>
                    <Link to={'to'}>
                        <div className={styles.main}>
                            <p style={{
                                textAlign: 'left',
                                margin: '5px 10px',
                                fontSize: '18px',
                                color: 'green',
                                textDecoration: 'none'
                            }}>Purchase history</p>
                            <GraphList count={count} />
                        </div>
                    </Link>
                </Card>
            </div>
            <p style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                borderRadius: '5px',
                padding: '5px',
                boxShadow: '2px 4px 5px #80808099'
            }}>
                Version {packageJson.version}
            </p>
        </>
    );
};

export default Dashboard;