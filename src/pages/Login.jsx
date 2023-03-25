import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header'
import Assert from '../Asserts/Asset-1.png'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, { username, password });
      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("first_name", response.data.data.first_name);
        localStorage.setItem("last_name", response.data.data.last_name);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("ID", response.data.data._id);
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("loggedIn", true);


        if (response.data.data.role === "admin") {
          alert("Login Successful");
          navigate("/adminDashboard");
        }
        else if (response.data.data.role === "doctor") {
          alert("Login Successful");
          localStorage.setItem("hospitalID", response.data.data.hospitalID);
          navigate("/doctorDashboard", { state: { hospitalID: response.data.data.hospitalID } });
        }
        else if (response.data.data.role === "nurse") {
          alert("Login Successful");
          localStorage.setItem("hospitalID", response.data.data.hospital);
          localStorage.setItem("wardID", response.data.data.ward);
          navigate("/nurseDashboard", { state: { hospitalID: response.data.data.hospital, wardID: response.data.data.ward } } );
        }
        else if (response.data.data.role === "ward manager") {
          alert("Login Successful");
          localStorage.setItem("hospitalID", response.data.data.hospitalID);
          localStorage.setItem("wardID", response.data.data.ward);
          navigate("/WardDashboard", { state: { wardID: response.data.data.ward,  HospitalID: response.data.data.hospitalID } });
        }
        else if (response.data.data.role === "night in charge") {
          alert("Login Successful");
          navigate("/adminDashboard" )
        }
      }
    }
    catch (err) {
      alert("Username or Password is incorrect")
    }
  }
  return (
    <section className="h-screen">
      <Header />
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img src={Assert} className="w-full" alt="Sample image" />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form className='mr-16'>
            <h2 class="mb-10 mt-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Login</h2>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Username
                  </label>
                  <input onChange={(e) => setUsername(e.target.value)} class="appearance-none resize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Username" />

                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Password
                  </label>
                  <input onChange={(e) => setPassword(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <button type="button" onClick={(e) => onsubmit(e)} className="inline-block rounded bg-blue-600 px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" data-te-ripple-init data-te-ripple-color="light">
                  Login
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login