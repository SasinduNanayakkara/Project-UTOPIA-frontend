import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../Asserts/Asset-1.png"

const Header = ({first_name, username}) => {
    const navigate = useNavigate();
    const [nameText, setNameText] = useState("");
    const [dashboardName, setDashboardName] = useState("");

    const handleLogin = () => {
            navigate("/")
            console.log("logging in");
    }

    const handleLogOut = () => {
       
        localStorage.clear();
        navigate("/")
    }

    useEffect(() => {
        setNameText(localStorage.getItem("first_name") || localStorage.getItem("name"));
        console.log("name", nameText);
        console.log("loggedIn", localStorage.getItem("loggedIn"));
    });

    const navigateToDashboard = () => {
        if (localStorage.getItem("role") === "admin") {
            navigate("/adminDashboard")
        }
        if (localStorage.getItem("role") === "night in charge") {
            navigate("/adminDashboard")
        }
        if (localStorage.getItem("role") === "doctor") {
            navigate("/doctorDashboard", { state: { hospitalID: localStorage.getItem("hospitalID") } })
        }
        if (localStorage.getItem("role") === "nurse") {
            navigate("/nurseDashboard", { state: { hospitalID: localStorage.getItem("hospitalID"), wardID: localStorage.getItem("wardID") } })
        }
        if (localStorage.getItem("role") === "ward manager") {
            navigate("/WardDashboard", { state: { wardID: localStorage.getItem("wardID"),  HospitalID: localStorage.getItem("hospitalID") } })
        }
    }

  return (
    <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="" class="flex items-center">
                <img src={logo} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            </a>
            <div class="flex items-center lg:order-2">
                {
                    localStorage.getItem("loggedIn") ? (
                        <a href="#" onClick={(e) => handleLogOut(e)} class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-gray-800">Log Out</a>
                    ) : (
                        <a href="#" onClick={(e) => handleLogin(e)} class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-gray-800">Log In</a>
                    )
                }
                <a class="text-gray-800 dark:text-white  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none dark:focus:ring-gray-800">{localStorage.getItem("loggedIn") ? nameText : ""}</a>
                
                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    {localStorage.getItem("loggedIn") && (
                        <li>
                        <a onClick={() => navigateToDashboard()} class="block py-2 pr-4 pl-3 cursor-pointer text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Your Dashboard</a>
                    </li>
                    )
                }
                    {/* <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li> */}
                </ul>
            </div>
        </div>
    </nav>
</header>
  )
}

export default Header