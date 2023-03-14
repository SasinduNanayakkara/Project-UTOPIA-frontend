import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../App';

function HospitalReport() {
    const location = useLocation();
    // const HospitalID = location.state.HospitalID;
    const HospitalID = "6408d47f1bd1a23165fb9d18";
    const [wards, setWards] = useState([]);
    const [wardIDs, setWardIDs] = useState([]);
    const [wardName, setWardName] = useState([]);
    const [no_of_beds, setNo_of_beds] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {

                const response = await axios.get(`${baseUrl}/ward/hospital/${HospitalID}`);
                if (response) {
                    console.log(response.data);
                    setWards(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
        if (wards) {
            wards.map((item) => {
                console.log("ok ");
                setWardIDs(wardID=> [...wardID, item._id] );
                setWardName(name => [...name, item.name]);
                setNo_of_beds(beds => [...beds, item.no_of_beds]);
            })
        }
    },[]);

    useEffect(() => {
        wardIDs.map((item) => {
            console.log("map item", item);
            getPatientData(item);
        });
        const getPatientData = async (id) => {
            const response = await axios.get(`${baseUrl}/patient/ward/${id}`);
            if (response) {
                console.log("ok");
                console.log("patient data", response.data);
            }
        }
    }, [])
    console.log("IDs",wardIDs);
    console.log("beds",no_of_beds);
    console.log("name",wardName);
    return (
        <div className="flex flex-col mx-20">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">ClassName</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                    <th scope="col" className="px-6 py-4">Heading</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Default
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Primary
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Secondary
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-success-200 bg-success-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Success
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Danger
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-warning-200 bg-warning-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Warning
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-info-200 bg-info-100 text-neutral-800">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Info
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Light
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                                <tr
                                    className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Dark
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalReport