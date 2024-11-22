import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

//  TODO: Validate the ITS Number input in real time and remove the type number because it shows up and down buttons

export default function SignUp() {
  const [formData, setFormData] = useState({
    its: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  //   const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({});
  }

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!formData.its) {
      newErrors.its = "ITS Number is required";
      isValid = false;
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Password and Confirm Password should match";
      newErrors.confirmPassword = "Password and Confirm Password should match";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit() {
    if (validateForm()) {
      // console.log("Form data: ", formData);
      setErrors({});
      let backend = import.meta.env.VITE_BACKEND_URL;
      const newErrors = {};

      try {
        const response = await fetch(`${backend}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(backend);
        if (!response.ok) {
          // Log both status code and message
          const error = data.error || "";
          if (response.status === 500 && error.includes("UNIQUE")) {
            newErrors.failed = "User already exists";
            setErrors(newErrors);
            throw new Error(data.error);
          }
        }
        setErrors({});
        navigate("/", { state: data.message });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="container max-w-md mx-auto mt-5 flex flex-1 flex-col items-center justify-center px-4 signupBox">
          <div className="bg-white min-h-min px-6 py-8 rounded shadow-md text-black w-full ">
            {errors.failed && (
              <div className="flex text-2xl mb-2 justify-center text-red-600">
                {errors.failed}
              </div>
            )}
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="number"
              className="block border border-grey-light w-full p-3 rounded"
              name="its"
              placeholder="ITS Number"
              onChange={handleInputChange}
            />
            {errors.its && <p className="error text-red-600">{errors.its}</p>}
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
            />
            {errors.name && <p className="error text-red-600">{errors.name}</p>}
            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />{" "}
            {errors.email && (
              <p className="error text-red-600">{errors.email}</p>
            )}
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="error text-red-600">{errors.password}</p>
            )}
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="error text-red-600">{errors.confirmPassword}</p>
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-center py-3 rounded bg-green-400 text-black hover:bg-green-600 focus:outline-none mt-4"
            >
              Create Account
            </button>
          </div>

          <div className="text-grey-dark mt-6 mb-6">
            Already have an account?
            <Link
              className="no-underline border-b border-blue text-blue ml-1 hover:text-blue-800"
              to="/"
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
}
