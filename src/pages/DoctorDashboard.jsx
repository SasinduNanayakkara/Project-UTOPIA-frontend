import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header'
import DocImg from "../Asserts/doc1.jpg";
import Doctors from "../Asserts/Doc.jpg";


function DoctorDashboard() {
  const navigate = useNavigate();
  console.log("ID", localStorage.getItem("ID"));

  const navigateToDoctorUpdate = (e) => {
    navigate('/updateDoctor', { state: { ID: localStorage.getItem("ID") } });
  }

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
                <h1 className="text-button-blue font-semibold text-5xl text-center">
                Hello {localStorage.getItem("username")}
                </h1>
              </div>
              <div className="w-[75%] mb-10 mt-12">
                <h4 className="text-button-blue text-5xl text-center">
                  Welcome To Your Doctor Dashboard...
                </h4>
              </div>
              

              <div className="bg-white w-[65%] h-auto p-14 rounded-xl mt-10 mb-10 mr-10 ml-10">
                <div className="flex-row">
                  <div className="mr-80">
                    <div className="my-10 flex flex-row">
                      <div className="flex flex-row bg-blue-900 h-20 w-100 mx-50 rounded transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                        <button
                          onClick={
                            navigateToDoctorUpdate
                          }
                          class="bg-button-blue h-20 hover:bg-button-hover-blue text-white font-bold px-[11.75rem] rounded">
                          Update Details
                        </button>
                        <img
                          src={
                            Doctors
                          }
                          className="mt-1 h-20 w-35"
                          alt="exams"
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
              src={DocImg}
              alt="DocImg"
            />
          </div>
        </div>
      </td>
    </tr>
  </table>
  </>
  )
}

export default DoctorDashboard