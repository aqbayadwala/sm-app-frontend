import ClassCard from "../components/ClassCard";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This component uses useRef and useEffect to handle preline's overlay css transitions
// and try to navigate to /daur in a cleaner way as per my understanding

export default function DaurList() {
  const [daurName, setDaurName] = useState("");
  const [daurs, setDaurs] = useState([]);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const backend = import.meta.env.VITE_BACKEND_URL;
  const jwtToken = localStorage.getItem("jwt");

  function handleInputChange(e) {
    setDaurName(e.target.value);
  }

  /*  function handletransition() {
      if (isRequestSuccessful) {
        navigate("/addnames", { state: { daurId: daurId } });
      }
    } */

  async function fetchDaurs() {
    try {
      //console.log("daurlist-fetchdaur", jwtToken);
      const response = await fetch(`${backend}/fetchdaurs`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setDaurs(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDaurs();
  }, []);

  /*  useEffect(() => {
      //console.log(daurId);
      const modal = modalRef.current;
      if (modal) {
        modal.addEventListener("transitionend", handletransition);
      }
      return () => {
        if (modal) {
          modal.removeEventListener("transitionend", handletransition);
        }
      };
    }, [isRequestSuccessful, daurId]); */

  async function handleSubmit() {
    console.log(daurName);
    try {
      const response = await fetch(`${backend}/createdaur`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ daurName: daurName }),
      });

      const data = await response.json();
      const id = data.daurId;

      if (response.status === 200) {
        console.log(id);
        navigate("/addnames", { state: { daurId: data.daurId } });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteDaurCard(id) {
    const previousDaurs = daurs;
    setDaurs((prevDaurs) => prevDaurs.filter((daur) => daur.id != id));
    try {
      const response = await fetch(`${backend}/deletedaur/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      setDaurs(previousDaurs);
    }
  }

  // Function to handle daur name change
  async function handleDaurNameChange(id, newName) {
    // First update the UI immediately
    setDaurs((prevDaurs) => {
      return prevDaurs.map((daur) =>
        daur.id === id ? { ...daur, name: newName } : daur,
      );
    });

    try {
      const response = await fetch(`${backend}/updatedaurname/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ daurName: newName }),
      });

      if (!response.ok) {
        setDaurs((prevDaurs) => {
          return prevDaurs.map((daur) =>
            daur.id === id ? { ...daur, name: daur.name } : daur,
          );
        });
      }
    } catch (error) {
      console.error(error);
      setDaurs((prevDaurs) => {
        return prevDaurs.map((daur) =>
          daur.id === id ? { ...daur, name: daur.name } : daur,
        );
      });
    }
  }

  async function editDaur(id) {
    try {
      const response = await fetch(`${backend}/getstudents/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      console.log("edit daur data", data);

      if (response.ok) {
        navigate("/addnames", {
          state: { daurId: id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleClickStart(id) {
    navigate("/startdaur", { state: { daurId: id } });
  }

  return (
    <>
      {/* Create daur modal component with header*/}
      <nav className="flex sticky top-0 justify-between pt-4 pb-4 border-b-2 border-slate-300 bg-gray-200 z-10">
        <h1 className="font-serif ml-5 text-4xl">Daur conducter</h1>
        <button
          type="button"
          className="mr-4 px-3 py-3 items-end text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-scale-animation-modal"
          data-hs-overlay="#hs-scale-animation-modal"
        >
          Create Daur
        </button>
      </nav>

      <div
        id="hs-scale-animation-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        ref={modalRef}
        aria-labelledby="hs-scale-animation-modal-label"
      >
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-fit sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-96 h-44 flex flex-col mx-auto bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-white">
              <h3
                id="hs-scale-animation-modal-label"
                className="font-bold text-gray-800"
              >
                Create Daur
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Close"
                data-hs-overlay="#hs-scale-animation-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="flex h-10 gap-3">
              <input
                name="createdaur"
                className="border w-full rounded border-gray-500 ml-3 mr-3 pl-2"
                type="text"
                placeholder="Daur Name"
                value={daurName}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 mt-3">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-scale-animation-modal"
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleSubmit}
                data-hs-overlay="#hs-scale-animation-modal"
                disabled={daurName === ""}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rendering daur cards*/}
      <div className="flex flex-col flex-wrap md:flex-row mb-7">
        {Array.isArray(daurs) && daurs.length > 0 ? (
          daurs.map((daur) => (
            <ClassCard
              key={daur.id}
              daurName={daur.name}
              onClickDaurName={handleDaurNameChange}
              onClickDelete={deleteDaurCard}
              onClickEdit={editDaur}
              onClickStart={handleClickStart}
              id={daur.id}
            />
          ))
        ) : (
          <p className="mt-10 mx-auto text-2xl">No daurs available</p>
        )}
      </div>
    </>
  );
}
