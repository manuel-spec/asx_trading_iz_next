import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";
import Skeleton from "./Skeleton";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


const HistoryChart = () => {
    const { id } = useParams();
    const { response } = useAxios(`coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily&precision=1`);
    console.log(response)

    if (!response) {
        return (
            <div className="wrapper-container mt-8">
                <Skeleton className="h-72 w-full mb-10" />
            </div>
        )
    }
    const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

    const options = {
        responsive: true,
        scales: {
            x: {
                display: false, // hide x-axis
            },
            y: {
                display: false, // hide y-axis
            }
        }
    }
    const data = {
        labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
        datasets: [
            {
                fill: true,
                label: id,
                data: coinChartData.map(val => val.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.1)',
                tension: 0.1
            }
        ]
    }

    return (
        <div>
            <Line options={options} data={data} />
            <div className="flex flex-col justify-center">
                <div><button>1D</button></div>
                <div><button>3D</button></div>
                <div><button>1W</button></div>
                <div><button>1M</button></div>
                <div><button>1Y</button></div>
            </div>
        </div>
    )
}

export default HistoryChart