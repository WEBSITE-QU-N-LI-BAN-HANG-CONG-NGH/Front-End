import React, { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="self-end mt-5 max-w-full w-[1162px]">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-6/12 max-md:ml-0 max-md:w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start px-14 py-10 mx-auto w-full text-sm bg-violet-50 max-md:px-5 max-md:mt-9 max-md:max-w-full"
          >
            <h2 className="text-lg font-semibold text-black">
              Registered Customers
            </h2>
            <p className="mt-5 font-light leading-loose text-black">
              If you have an account, sign in with your email address.
            </p>
            <label className="mt-7 text-sm font-semibold leading-loose text-black">
              Email <span className="text-[#C94D3F]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="self-stretch px-4 py-5 mt-3.5 font-light leading-none text-gray-400 bg-white rounded border border-solid border-[#A2A6B0] max-md:pr-5 max-md:max-w-full"
            />
            <label className="mt-5 text-sm font-semibold leading-loose text-black">
              Password <span className="text-[#C94D3F]">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Password"
              className="self-stretch px-4 py-5 mt-3.5 font-light leading-none text-gray-400 bg-white rounded border border-solid border-[#A2A6B0] max-md:pr-5 max-md:max-w-full"
            />
            <div className="flex gap-6 mt-8">
              <button
                type="submit"
                className="px-14 py-5 font-semibold text-center text-white border-3 border-transparent hover:text-[#0156FF] hover:border-[#0156FF] duration-500 hover:bg-white bg-blue-600 rounded-[50px] max-md:px-5"
              >
                Sign In
              </button>
              <button
                type="button"
                className="my-auto leading-none text-blue-600 basis-auto"
              >
                Forgot Your Password?
              </button>
            </div>
          </form>
        </div>
        <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start px-14 pt-9 pb-36 w-full text-sm font-semibold bg-violet-50 max-md:px-5 max-md:pb-24 max-md:mt-9 max-md:max-w-full">
            <h2 className="text-lg text-black">New Customer?</h2>
            <div className="mt-5 font-light leading-5 text-black">
              Creating an account has many benefits: <br />• Check out faster
              <br />• Keep more than one address
              <br />• Track orders and more
            </div>
            <button className="px-9 py-5 mt-9 text-center text-white bg-blue-600 border-3 border-transparent hover:text-[#0156FF] hover:border-[#0156FF] duration-500 hover:bg-white rounded-[50px] max-md:px-5">
              Create An Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
