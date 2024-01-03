import { useState, useEffect } from "react";
import axios from "../../services/api";
import ReactPaginate from "react-paginate";

function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/auth/admin-logs?page=${currentPage}`)
      .then((response) => setLogs(response.data))
      .catch((error) => console.error(error));
  }, [currentPage]);

  const handlePageChange = (selectedItem) => {
    const pageNumber = selectedItem.selected + 1;
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
        <caption className="caption-top">Admin log reports</caption>
        <thead>
          <tr className="p-3 font-bold uppercase bg-blue-500 border border-gray-300">
            <th className="border border-gray-300 p-3 my-2">Admin Username</th>
            <th className="border border-gray-300 p-3 my-2">Action</th>
            <th className="border border-gray-300 p-3 my-2">Notes</th>
            <th className="border border-gray-300 p-3 my-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr
                key={log._id}
                className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white"
              >
                <td className="border border-gray-300 p-3 my-2">
                  {log.adminUsername}
                </td>
                <td className="border border-gray-300 p-3 my-2">
                  {log.action}
                </td>
                <td className="border border-gray-300 p-3 my-2">{log.notes}</td>
                <td className="border border-gray-300 p-3 my-2">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white">
              <td colSpan="4" className="text-center">
                No logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={10}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center mt-8"
        activeClassName="bg-blue-500 text-white"
        pageClassName="mx-2 rounded-full hover:bg-blue-200"
        previousClassName="mx-2 rounded-full hover:bg-blue-200"
        nextClassName="mx-2 rounded-full hover:bg-blue-200"
        breakClassName="mx-2"
        pageLinkClassName="block py-2 px-3"
        previousLinkClassName="block py-2 px-3"
        nextLinkClassName="block py-2 px-3"
        breakLinkClassName="block py-2 px-3"
      />
    </div>
  );
}

export default AdminLogs;
