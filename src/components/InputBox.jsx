import { useState } from "react";

export default function InputBox({ row, onValueChange, errorsFinal }) {
  function handleInput(e, row) {
    onValueChange(e, row.id);
  }

  return (
    <div className="container pt-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="ml-3 mt-2 md:w-1/2">
          <input
            type="text"
            name="name"
            className="border-2 h-8 pl-2 w-full border-gray-500 rounded"
            placeholder="Name"
            value={row.name}
            onChange={(e) => handleInput(e, row)}
          />
          {errorsFinal?.name && (
            <p className="text-red-500">{errorsFinal?.name}</p>
          )}
        </div>
        <div className="ml-3 mt-2 md:w-1/3">
          <input
            type="text"
            name="its"
            className="border-2 w-full h-8 pl-2 border-gray-500 rounded"
            placeholder="ITS Number"
            value={row.its}
            onChange={(e) => handleInput(e, row)}
          />
          {errorsFinal?.its && (
            <p className="text-red-500">{errorsFinal?.its}</p>
          )}
        </div>
        <div className="ml-3 mt-2 md:w-1/3">
          <select
            name="grade"
            className="border-2 h-8 pl-2 w-full border-gray-400 rounded"
            placeholder="Grade"
            value={row.grade}
            onChange={(e) => handleInput(e, row)}
          >
            <option value="">Choose a Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          {errorsFinal?.grade && (
            <p className="text-red-500">{errorsFinal?.grade}</p>
          )}
        </div>
      </div>
    </div>
  );
}
