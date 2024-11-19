import { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import { useLocation, useNavigate } from "react-router-dom";

// This logic is made in order to add input boxes when pressed Add Names button
// It uses a rows.map function to render divs of input boxes
// It uniquely identifies the div with the rows arrays date.now value
// ChatGPT the code to understand if in case I forget the logic

export default function AddnamesPage() {
  const location = useLocation();
  const { daurId } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!daurId) {
      navigate("/daurlist");
    }
  }, [daurId, navigate]);

  if (!daurId) return null;

  const [rows, setRows] = useState([
    { id: Date.now(), name: "", its: "", grade: "" },
  ]);
  const [errors, setErrors] = useState({});
  // Logic to add rows of input boxes

  function handleAdd() {
    setRows([...rows, { id: Date.now(), name: "", its: "", grade: "" }]);
  }

  function handleDelete(id) {
    setRows(() => rows.filter((row) => row.id !== id));
  }

  // Logic to fetch data from InputBox components (controlled components)

  function handleInputChange(e, id) {
    const { name, value } = e.target;
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [name]: value };
          const rowErrors = validateRow(updatedRow);

          setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: rowErrors,
          }));

          return updatedRow;
        }
        return row;
      }),
    );
  }

  function validateRow(row) {
    const rowErrors = {};
    if (isNaN(Number(row.its))) {
      rowErrors.its = "ITS should be a number";
    }

    return rowErrors;
  }

  async function handleSubmit() {
    const newErrors = {};
    let hasErrors = false;

    if (rows.length === 0) {
      newErrors.error = "rows empty";
      hasErrors = true;
    }

    const itsValues = [];

    rows.forEach((row) => {
      const rowErrors = {};
      if (!row.name) {
        rowErrors.name = "Name is a required field";
        hasErrors = true;
      }

      if (!row.its) {
        rowErrors.its = "ITS is a required field";
        hasErrors = true;
      } else if (isNaN(Number(row.its))) {
        rowErrors.its = "ITS should be a number";
        hasErrors = true;
      } else if (itsValues.includes(row.its)) {
        rowErrors.its = "ITS value must be unique";
        hasErrors = true;
      } else {
        itsValues.push(row.its);
      }

      if (!row.grade) {
        rowErrors.grade = "Select a grade from A to D";
        hasErrors = true;
      }

      if (Object.keys(rowErrors).length > 0) {
        newErrors[row.id] = rowErrors;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      console.log(rows);
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log(daurId);
        const finalPayload = [{ daurId: daurId }, rows];
        const response = await fetch(`${backendUrl}/addstudents`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const duplicateIts = errorData.its || "";

          const updatedErrors = { ...newErrors };

          rows.forEach((row) => {
            if (row.its === duplicateIts) {
              if (!updatedErrors[row.id]) {
                updatedErrors[row.id] = {};
              }

              updatedErrors[row.id].its = "ITS already exists in database";
            }
          });

          setErrors(updatedErrors);
          return;
        }

        const data = await response.json();
        console.log(data);

        navigate("/daurlist");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="md:w-1/2 md:mx-auto">
        <header className="flex justify-center font-bold text-3xl p-5">
          Add students to your Daur
        </header>
        {rows.map((row) => (
          <div key={row.id} className="flex mr-5 ">
            <InputBox
              row={row}
              errorsFinal={errors[row.id]}
              onValueChange={handleInputChange}
            />
            <button
              onClick={() => handleDelete(row.id)}
              className="mt-5 ml-2 pt-2 pb-2 px-4 h-9 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              -
            </button>
          </div>
        ))}
        <div className="flex justify-center mt-5">
          <button
            onClick={handleAdd}
            className="justify-center px-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-800 font-medium rounded-lg text p-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          >
            Add names +
          </button>
          {rows.length > 0 && (
            <button
              onClick={handleSubmit}
              className="justify-center ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-800 font-medium rounded-lg text p-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            >
              Save names
            </button>
          )}
        </div>
      </div>
    </>
  );
}
