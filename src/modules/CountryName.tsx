import React, { useState, useEffect, FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Dropdown from "../components/UI/Dropdown";
import Navbar from '../components/Layout/Navbar';
import { Bar } from "react-chartjs-2";

type Props = RouteComponentProps<{
    results: string
}>

export const CountryName: FC<Props> = ({ results = 'Africa' }) => {

    const [countryList, setCountryList] = useState<any>();

    useEffect(() => {
        fetch(`https://covid-193.p.rapidapi.com/history?country=${results}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "67f1b9b329msh37f1aaceb84a3aep18c5fejsn7dd88e237824",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setCountryList(res);
            })
            .catch((error: any) => {
                console.log("error", error);
            });
    }, [results]);

    let countries: any
    if (countryList != undefined) countries = countryList["response"][0];

    const chartData = {
        labels: ["Total Deaths", "Total Cases", "Recovered"],
        datasets: [
            {
                data: [
                    countries && countries.deaths.total,
                    countries && countries.cases.total,
                    countries && countries.cases.recovered,
                ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: "Graphical representation of cases",
            },
        },
    };



    let lastUpdate
    // format date as yyyy/mm/dd HH:MM
    if (countryList != undefined) lastUpdate = countries.time.replace("T", " ");
    if (countryList != undefined) lastUpdate = lastUpdate.slice(0, lastUpdate.length - 9);

    return (
        <div className="bg-gray-100 min-h-screen w-full grid justify-items-center">
            <Navbar />
            <title>{countries && countries.country}</title>
            <div className="flex-col justify-items-center mb-10">
                <div className="grid justify-items-center mt-10">
                    <h3 className="text-red-400 font-bold text-sm">
                        Your country result
                    </h3>
                    <h1 className="text-6xl font-bold">{countries && countries.country}</h1>
                    <p className="text-gray-500 mt-4">
                        Continent - {countries && countries.continent}
                    </p>
                    <h3 className="font-semibold mt-5 text-gray-600">
                        Last Update - {lastUpdate}
                    </h3>
                    <Dropdown />
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-24 gap-x-10 gap-y-10 mx-2">
                    <div className="bg-white shadow-sm border-1 border-gray-100 p-8 w-full max-w-4xl rounded-md">
                        <div>
                            <h2 className="text-5xl font-bold text-blue-800">
                                {countries && countries.cases.total}
                            </h2>
                            <p className="text-gray-500">Total Cases as of Today</p>
                            <div className="grid mt-5 gap-x-10">
                                <div>
                                    <p className="text-gray-500">NEW CASES</p>
                                    <p className="text-gray-700 font-bold text-xl">
                                        {countries && countries.cases.new}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-sm border-1 border-gray-100 p-8 w-full max-w-4xl rounded-md">
                        <div>
                            <h2 className="text-5xl font-bold text-red-500">
                                {countries && countries.deaths.total}
                            </h2>
                            <p className="text-gray-500">Total Deaths as of Today</p>
                            <div className="grid grid-cols-2 mt-5 gap-x-10">
                                <div>
                                    <p className="text-gray-500">NEW DEATHS</p>
                                    <p className="text-gray-700 font-bold text-xl">
                                        {countries && countries.deaths.new}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-sm border-1 border-gray-100 p-8 w-full max-w-4xl rounded-md">
                        <div>
                            <h2 className="text-5xl font-bold text-green-600">
                                {countries && countries.cases.recovered}
                            </h2>
                            <p className="text-gray-500">Recovered as of today</p>
                            <div className="grid grid-cols-2 mt-5 gap-x-10">
                                <div>
                                    <p className="text-gray-500">CRITICAL</p>
                                    <p className="text-gray-700 font-bold text-xl">
                                        {countries && countries.cases.critical}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    {/** @ts-ignore */}
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    )
}

