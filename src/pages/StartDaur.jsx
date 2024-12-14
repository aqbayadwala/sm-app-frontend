export default function StartDaur() {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto my-auto">
      <div className="dropdowns bg-blue-500">Hello</div>Table
      <table className="table-auto  md:w-[50rem]">
        <thead className="bg-gray-400">
          <tr>
            <th className="border border-gray-800 px-2 py-2">Sr. No.</th>
            <th className="border border-gray-800 px-4 py-2">Name</th>
            <th className="border border-gray-800 px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-800 px-2 py-1">1</td>
            <td className="border border-gray-800 px-4 py-1">Hello</td>
            <td className="border border-gray-800 px-4 py-1">World</td>
          </tr>
          <tr>
            <td className="border border-gray-800 px-2 py-1">2</td>
            <td className="border border-gray-800 px-4 py-1">Example</td>
            <td className="border border-gray-800 px-4 py-1">Data</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

{
  /*return
     <div className="table-div">
      Table div
      <table className="mx-auto table-auto border border-slate-500 border-rounded">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Sr. No.</th>
            <th>Sr. No.</th>
          </tr>
        </thead>
        <tbody>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
        </tbody>
      </table>
    </div>
*/
}
