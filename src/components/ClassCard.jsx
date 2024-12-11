import { useState } from "react";
import card from "../assets/quranc-card.jpg";

export default function ClassCard({
  daurName,
  onClickEdit,
  onClickDelete,
  onClickDaurName,
  onClickStart,
  id,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDaurName, setNewDaurName] = useState(daurName);

  function handleNameChange(e) {
    setNewDaurName(e.target.value);
  }

  function toggleEdit() {
    if (isEditing && newDaurName !== daurName) {
      onClickDaurName(id, newDaurName);
    }
    setIsEditing(!isEditing);
  }
  return (
    <>
      <div className="flex flex-col bg-blue-200 shadow-md rounded-lg w-96 mx-auto md:mx-10 md:mt-10 mt-7">
        <div className="h-56 m-2.5 text-white  overflow-hidden rounded-md">
          <img src={card} alt="card-image" className="brightness-90" />
        </div>
        <div className="p-4">
          {isEditing ? (
            <input
              type="text"
              value={newDaurName}
              onChange={handleNameChange}
              onBlur={() => toggleEdit()}
              className="w-full bg-blue-200 text-slate-800 text-xl font-semibold border-none focus:outline-none px-0 py-1"
              autoFocus
            />
          ) : (
            <h6
              onClick={toggleEdit}
              className="mb-2 text-slate-800 text-xl font-semibold"
            >
              {daurName}
            </h6>
          )}
        </div>
        <div className="px-4 pb-4 pt-0 mt-2 mx-auto">
          <button
            className="rounded-md bg-slate-800 py-2 px-4 mr-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => onClickStart(id)}
          >
            Start Daur
          </button>
          <button
            className="rounded-md bg-slate-800 py-2 px-4 mr-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => onClickEdit(id)}
          >
            Edit Daur
          </button>
          <button
            className="rounded-md bg-slate-800 py-2 px-4 mr-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => onClickDelete(id)}
          >
            Delete Daur
          </button>
        </div>
      </div>
    </>
  );
}
