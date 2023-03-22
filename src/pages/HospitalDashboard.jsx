import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Ward from "../Asserts/ward.jpg";
import Doctors from "../Asserts/Doc.jpg";
import Patients from "../Asserts/patients.jpg";
import Header from '../Components/Header'

function HospitalDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state.name;
  const id = location.state.id;
  const locationData = location.state.location;

  const addWard = (e) => {
    navigate('/wards', { state: { hospitalID: id } })
  }
  const navigateToDoctors = (e) => {
    navigate('/doctors', { state: { hospitalID: id } })
  }

  const navigateToReport = (e) => {
    navigate('/hospitalReport', { state: { hospitalID: id, hospitalName: name } })
  }

  useEffect(() => {
		const authenticate = async () => {
			if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "night in charge") {
				return true;
			}
			else {
				alert("You are not authorized to view this page");
				navigate(-1);
			}
		}
		authenticate();
	});

  return (
    <>
      <div>
        <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />

      </div>
      <table>
        <tr>
          <td className="w-fit">
            <div className="bg-main-blue w-[100%] h-full">
              <div className="flex justify-center items-center">
                <div className="ml-20 w-full ">
                  <div className="w-[75%] mb-10 mt-12">
                    <h2 class="text-center mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Hospital Dashboard</h2>
                  </div>

                  <div className="w-3/4 mb-10 mt-12">
                    <h6 className="text-center mb-10 mt-8 ml-10 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl py-2 rounded shadow-lg">
                      Hospital - {name} <br />
                      Location - {locationData} <br />
                    </h6>
                  </div>
                  <div className="bg-white w-[65%] h-auto p-14 rounded-xl mt-10 mb-10 mr-10 ml-10">
                    <div className="flex-row">
                      <div className="mr-80">
                        <div className="my-10 flex flex-row">
                          <div className="flex flex-row bg-blue-900 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                            <button
                              onClick={
                                addWard
                              }
                              class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg  px-[11.95rem] rounded">
                              Wards
                            </button>
                            <img
                              src={
                                Ward
                              }
                              className="mt-1 h-20 w-35"
                              alt="exams"
                            />
                          </div>
                        </div>
                        <div className="my-10 flex flex-row">
                          <div className="flex flex-row bg-blue-600 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                            <button
                              onClick={
                                navigateToDoctors
                              }
                              class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg px-[11.66rem] rounded">
                              Doctors Details
                            </button>
                            <img
                              src={
                                Doctors
                              }
                              className="mt-1 h-20 w-35"
                              alt="timetable"
                            />
                          </div>
                        </div>
                        <div className="my-10 flex flex-row">
                          <div className="flex flex-row bg-blue-900 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                            <button
                              onClick={
                                navigateToReport
                              }
                              class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold text-lg px-[11.66rem] rounded">
                              Hospital Report
                            </button>
                            <img
                              src={
                                Patients
                              }
                              className="mt-1 h-20 w-35"
                              alt="timetable"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td className="bg-main-blue w-fit">
            <div class="lg:w-[80%] flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
              <div class="text-white">
                <img
                  src={Ward}
                  alt="Ward"
                />
              </div>
            </div>
          </td>
        </tr>
      </table>
    </>
  )
}

export default HospitalDashboard