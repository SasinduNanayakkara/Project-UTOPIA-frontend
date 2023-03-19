import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header'
import { } from "../Components/Notification";

function DoctorProfile() {

    const navigate = useNavigate();
        const location = useLocation();
        const ID = location.state.ID;
        const [first_name, setFirst_name] = useState("");
        const [last_name, setLast_name] = useState("");
        const [email, setEmail] = useState("");
        const [specialization, setSpecialization] = useState("");
        const [password, setPassword] = useState("");
        const [confirm_password, setConfirm_password] = useState("");
        const [username, setUsername] = useState("");
        const [Hospital, setHospital] = useState("");
        const [NIC, setNIC] = useState("");
        const [hospitals, setHospitals] = useState([]);
        const [passwordMatch, setPasswordMatch] = useState(true);
        const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

        console.log(hospitals);

        useEffect(() => {
            const getData = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/doctor/${ID}`);
                    if (response) {
                        console.log(response);
                        setFirst_name(response.data.first_name);
                        setLast_name(response.data.last_name);
                        setEmail(response.data.email);
                        setUsername(response.data.username);
                        setNIC(response.data.NIC);
                        setSpecialization(response.data.specialization);
                        setHospital(response.data.hospitalID);
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            getData();
        }, []);

        useEffect(() => {
            const authenticate = async () => {
                if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "doctor") {
                    return true;
                }
                else {
                    alert("You are not authorized to view this page");
                    navigate(-1);
                }
            }
            authenticate();
        });

        const handleSubmit = async (e) => {
            navigate("/doctorDashboard", { state: { hospitalID: Hospital } });
        }

        return (
            <section className="h-screen">
                <Header />
                <div className="h-full">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
                        </div>
                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                            <form class="w-full max-w-lg">
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <h2 class="mb-10 mt-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Doctor Registration</h2>
                                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                            First Name
                                        </label>
                                        <input value={first_name} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First name" />
                                        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                    </div>
                                    <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                            Last Name
                                        </label>
                                        <input value={last_name} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last name" />
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Email
                                        </label>
                                        <input value={email} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Email" />
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Specialization
                                        </label>
                                        <input value={specialization} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Specialization" />
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            NIC
                                        </label>
                                        <input value={NIC} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="NIC" />
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Username
                                        </label>
                                        <input value={username} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Username" />
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Password
                                        </label>
                                        <input value={"asd123"} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                                    </div>
                                </div>

                        <div class="flex items-center justify-between mb-6">
                            <button onClick={(e) => { handleSubmit(e) }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Go Back
                            </button>
                        </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
  )
}

export default DoctorProfile