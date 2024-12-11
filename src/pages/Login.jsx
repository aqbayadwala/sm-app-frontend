import logo from "../assets/Khamgam-Logo-03.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const location = useLocation();
  const message = location.state;
  const navigate = useNavigate();

  // Logic for showing message "Successfully registered" in the login page and then clearing it on reload
  useEffect(() => {
    // Clear message from URL when component mounts
    if (message) {
      // Clear the state associated with the URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [message]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({});
    setServerError("");
  }

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      // console.log("Form data: ", formData);
      setErrors({});
      setServerError("");

      try {
        let backend = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backend}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          //credentials: "include",
        });

        const data = await response.json();
        //console.log(data.access_token);
        localStorage.setItem("jwt", data.access_token);
        console.log(response.status);
        if (response.ok) {
          navigate("/daurlist");
        } else {
          setServerError("Invalid Credentials");
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log(serverError);
  }

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        {message && (
          <div className="md:text-2xl mx-auto justify-center mb-10 text-green-600">
            {message}
          </div>
        )}
        {serverError && (
          <div className="md:text-2xl mx-auto justify-center mb-10 text-green-600">
            {serverError}
          </div>
        )}
        <div>
          <img className="mx-auto h-15 w-20" src={logo} alt="Your Company" />

          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="m-10 md:w-1/4 md:mx-auto">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address/ITS
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2.5"
                />
                {errors.email && (
                  <div className="error text-red-700">{errors.email}</div>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  autoComplete="current-password"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2.5"
                />
                {errors.password && (
                  <div className="error text-red-700">{errors.password}</div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-1/2 mx-auto mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Sign in
              </button>
            </div>
            {/* <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div> */}
          </form>
          <div className="flex mt-3 justify-center mt-5">
            Not a user?
            <Link to="signup" className="hover:text-blue-600">
              &nbsp;Register
            </Link>
            <Link to="daurlist" className="hover:text-blue-600">
              &nbsp;Create Daur
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          Please give your valuable&nbsp;
          <a
            href="https://forms.gle/VD6XhRcwLtf8EGCo7"
            className="text-blue-600 underline hover:text-blue-600"
            target="blank"
          >
            feedback
          </a>
        </div>
      </div>
    </>
  );
}
