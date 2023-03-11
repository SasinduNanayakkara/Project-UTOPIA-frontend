import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
import Header from '../Components/Header'

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
        localStorage.setItem("ID", response.data.data._id);
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("loggedIn", true);

        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("username"));
        console.log(localStorage.getItem("first_name"));
        console.log(localStorage.getItem("last_name"));
        console.log(localStorage.getItem("ID"));

        if (response.data.data.role === "admin") {
          navigate("/adminDashboard");
        }
        else if (response.data.data.role === "doctor") {
          navigate("/doctorDashboard");
        }
        else if (response.data.data.role === "nurse") {
          navigate("/nurseDashboard");
        }
      }
    }
    catch (err) {
      console.log(err);
    }
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
            <form className='mr-16'>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input onChange={(e) => setUsername(e.target.value)} type="text" className=" peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black text-black dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="exampleFormControlInput2" placeholder="Username" />
                <label htmlFor="exampleFormControlInput2" className="pointer-events-none focus:text-sky-500 absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-gray-400 dark:peer-focus:text-blue-600">Username
                </label>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="exampleFormControlInput22" placeholder="Password" />
                <label htmlFor="exampleFormControlInput22" className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-gray-400 dark:peer-focus:text-blue-600">Password
                </label>
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