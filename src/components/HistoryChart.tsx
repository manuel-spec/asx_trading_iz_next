import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";
import Skeleton from "./Skeleton";
import EntrustModal from "./Modal/EntrustModal";
import { useState, useEffect } from "react";
import { BsGraphUp } from "react-icons/bs";
import { GrServers } from "react-icons/gr";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { RemoveScroll } from 'react-remove-scroll';
import ReactRemoveScroll from "react-remove-scroll/dist/es5/Combination";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
);

const HistoryChart = (props) => {
    useLockBodyScroll();
    const [openModal, setOpenModal] = useState(false);
    const [precision, setPrecision] = useState(1);
    const [chartKey, setChartKey] = useState(Date.now()); // Key prop to force chart reload

    useEffect(() => {
        // Reload the chart whenever precision changes
        setChartKey(Date.now());
    }, [precision]);

    const handlePrecisionChange = (precision) => {
        setPrecision(precision);
    };

    const handleEntrustButtonClick = (event) => {
        event.stopPropagation();
        setOpenModal(true);
    };

    const { id } = useParams();
    const { response } = useAxios(`/coins/${props.data["id"]}/market_chart?vs_currency=usd&days=30&interval=daily&precision=${precision}`);


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
    const chartData = {
        labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
        datasets: [
            {
                fill: true,
                label: id,
                data: coinChartData.map(val => val.y),
                borderColor: '#2850E7',
                backgroundColor: 'rgba(53, 162, 235, 0.1)',
                tension: 0.4 // Adjust the tension value to make the line smoother
            }
        ]
    }

    return (

        <div className="scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded">
            <div className="flex flex-row">
                <div>
                    <img className="" src={props.data.image} height={50} width={50} alt="crypto" />
                </div>
                <div className="flex flex-col">
                    <div><p className="font-semibold ml-3 mt-1"> {props.data.symbol.toUpperCase()} Coin</p></div>
                    <div><p className="font-semibold ml-3 mt-1">USDT</p></div>

                </div>


            </div>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <p className="ml-4 text-xl font-semibold">US$ {props.data.current_price.toFixed(1)}</p>
                </div>
                <div>

                    <p className="ml-6" style={{ color: props.data.market_cap_change_percentage_24h < 0 ? 'red' : 'green' }}>{props.data.market_cap_change_percentage_24h.toFixed(2)} % </p>
                </div>
            </div>
            <Line key={chartKey} options={options} data={chartData} />
            <div className="flex flex-row gap-5 justify-between items-center">
                <div><button onClick={() => handlePrecisionChange(1)} className="focus:text-[#2850E7]">1D</button></div>
                <div><button onClick={() => handlePrecisionChange(3)} className="focus:text-[#2850E7]">3D</button></div>
                <div><button onClick={() => handlePrecisionChange(7)} className="focus:text-[#2850E7]">1W</button></div>
                <div><button onClick={() => handlePrecisionChange(30)} className="focus:text-[#2850E7]">1M</button></div>
                <div><button onClick={() => handlePrecisionChange(365)} className="focus:text-[#2850E7]">1Y</button></div>
            </div>

            {openModal && <EntrustModal visible={openModal} onClose={() => setOpenModal(false)} coinDetail={props} />}

            <div>
                <div>
                    <p className="text-xl font-semibold">Functions</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">

                        <div className="flex flex-row mt-6"><div className="mr-7 mt-1"><BsGraphUp style={{ color: 'blue' }} /></div> <span>24h volume</span></div>
                        <div className="mt-2">{props.data.total_volume}</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row mt-6"><div className="mr-7 mt-1"> <GrServers style={{ color: 'blue' }} /></div><span>24h transaction</span></div>
                        <div className="mt-2">US$ {props.data.market_cap}</div>
                    </div>
                    <button className='px-16 py-3 mt-2  bg-[#2850E7] rounded mt-2 text-white font-mediumbold ' onClick={handleEntrustButtonClick}>Entrust Now</button>
                </div>
            </div>

        </div>
    )
}

export default HistoryChart;
