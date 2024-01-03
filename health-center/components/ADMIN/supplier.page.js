import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setSupplier] = useState({
    name: "",
    phone: "",
    email: "",
    licenseNo: "",
    address: {
      street: "",
      district: "",
      state: "",
      country: "India",
      pin: "",
    },
  });

  const [delSupplier, setDelSupplier] = useState({});

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .post("/supplier", newSupplier)
      .then((response) => {
        console.log(response.data);
        toast.success("Supplier added successfully");
        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "Supplier added",
          notes: newSupplier.email,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleDelete = (e) => {
    if (!delSupplier.id) {
      toast.error("No Supplier ID found.");
      return;
    }

    e.preventDefault();
    axios
      .delete("/supplier/" + delSupplier.id)
      .then((response) => {
        console.log(response.data);
        toast.info(response.data.message);
        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "supplier deleted",
          notes: delSupplier.id,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteMail = (e) => {
    e.preventDefault();

    if (!delSupplier.email) {
      toast.error("No Supplier email found.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(delSupplier.email)) {
      toast.error("Invalid email format.");
      return;
    }

    axios
      .delete("/supplier/mail/" + delSupplier.email)
      .then((response) => {
        console.log(response.data);
        toast.success("Supplier deleted successfully");
        setDelSupplier({});
        axios.post("/auth/admin-logs", {
          adminUsername: adminId,
          action: "supplier deleted",
          notes: delSupplier.email,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      setAdminId(foundUser.adminId);
    } else {
      toast.error("Please login first");
      navigate("/admin");
    }
  }, [adminId]);

  useEffect(() => {
    axios
      .get("/supplier")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="ml-8 lg:ml-64">
      {" "}
      <header className="bg-indigo-800 h-16 top-0 fixed w-full flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">SUPPLIERS</h1>
      </header>
      <div className="flex-col">
        <div className="container mx-auto overflow-x-auto place-items-center font-sans flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-between m-4 flex-col md:flex-row gap-4">
            <table className="mt-32 table-auto border-collapse border-2 hover:box-shadow-2xl m-8">
              <thead>
                <tr className="p-3 font-bold uppercase bg-blue-400 border border-gray-300">
                  <th className="border border-gray-300 p-3 my-2">Name</th>
                  <th className="border border-gray-300 p-3 my-2">Email</th>
                  <th className="border border-gray-300 p-3 my-2">Phone</th>
                  <th className="border border-gray-300 p-3 my-2">License</th>
                  <th className="border border-gray-300 p-3 my-2">Street</th>
                  <th className="border border-gray-300 p-3 my-2">District</th>
                  <th className="border border-gray-300 p-3 my-2">State</th>
                  <th className="border border-gray-300 p-3 my-2">Country</th>
                  <th className="border border-gray-300 p-3 my-2">Pin</th>
                  <th className="border border-gray-300 p-3 my-2">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr
                    key={supplier._id}
                    className=" bg-white text-gray-700 transition-all hover:bg-slate-500 hover:text-white  uppercase  "
                  >
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.name}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.email}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.phone}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.licenseNo}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.address.street}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.address.district}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.address.state}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.address.country}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.address.pin}
                    </td>
                    <td className="border border-gray-300 p-3 my-2">
                      {supplier.createdAt == undefined
                        ? "------"
                        : new Date(supplier.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row  justify-center gap-5">
          <div className="w-full max-w-md">
            <form className="sm:border-solid sm:border-2 border-gray-600 bg-transparent shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
              <fieldset>
                <legend className="text-green-800 font-bold text-center text-2xl">
                  ADD SUPPLIER
                </legend>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={newSupplier.name}
                    required
                    onChange={(event) =>
                      setSupplier({ ...newSupplier, name: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    value={newSupplier.phone}
                    onChange={(event) =>
                      setSupplier({ ...newSupplier, phone: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={newSupplier.email}
                    onChange={(event) =>
                      setSupplier({ ...newSupplier, email: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="licenseNo"
                  >
                    License No
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="licenseNo"
                    type="text"
                    placeholder="License Number"
                    value={newSupplier.licenseNo}
                    onChange={(event) =>
                      setSupplier({
                        ...newSupplier,
                        licenseNo: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="street"
                  >
                    Street
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="street"
                    type="street"
                    name="street"
                    placeholder="Street"
                    value={newSupplier.address.street}
                    onChange={(event) =>
                      setSupplier({
                        ...newSupplier,
                        address: {
                          ...newSupplier.address,
                          street: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="district"
                  >
                    District
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="district"
                    type="district"
                    name="district"
                    placeholder="District"
                    value={newSupplier.address.district}
                    onChange={(event) =>
                      setSupplier({
                        ...newSupplier,
                        address: {
                          ...newSupplier.address,
                          district: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="state"
                    name="state"
                    placeholder="State"
                    value={newSupplier.address.state}
                    onChange={(event) =>
                      setSupplier({
                        ...newSupplier,
                        address: {
                          ...newSupplier.address,
                          state: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="pin"
                  >
                    Pin Code
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pin"
                    type="pin"
                    name="pin"
                    placeholder="Pin Code"
                    value={newSupplier.address.pin}
                    onChange={(event) =>
                      setSupplier({
                        ...newSupplier,
                        address: {
                          ...newSupplier.address,
                          pin: event.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="w-full max-w-md">
            <form className="sm:border-solid sm:border-2 border-gray-600 bg-transparent shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
              <fieldset>
                <legend className="text-red-800 font-bold text-center text-2xl">
                  DELETE SUPPLIER
                </legend>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    E-mail
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="email"
                    placeholder="E-mail"
                    value={delSupplier.email}
                    onChange={(event) =>
                      setDelSupplier({
                        ...delSupplier,
                        email: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="id"
                  >
                    Doctor id:
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="id"
                    type="text"
                    placeholder="ID"
                    value={delSupplier.id}
                    onChange={(event) =>
                      setDelSupplier({ ...delSupplier, id: event.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                  <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    name="Delid"
                    onClick={handleDelete}
                  >
                    DELETE ID
                  </button>
                  <span>OR</span>
                  <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    name="Delmail"
                    onClick={handleDeleteMail}
                  >
                    DELETE MAIL
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SupplierPage;
