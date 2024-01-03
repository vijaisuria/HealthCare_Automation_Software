import React, { useState, useEffect } from "react";
import Select from "react-select";

import axios from "../../../services/api";

const SupplierDropdown = ({ onChange }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch the list of suppliers from your backend API
    axios
      .get("/supplier") // Replace this with your actual endpoint to fetch suppliers
      .then((response) => {
        const supplierOptions = response.data.map((supplier) => ({
          value: supplier._id,
          label: supplier.name,
        }));
        setSuppliers(supplierOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Filter suppliers based on the search query
    if (searchQuery.trim() === "") {
      setFilteredSuppliers(suppliers.slice(0, 10)); // Display only first 10 suppliers when the search query is empty
    } else {
      const filtered = suppliers.filter((supplier) =>
        supplier.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    }
  }, [searchQuery, suppliers]);

  const handleInputChange = (newValue) => {
    setSearchQuery(newValue);
  };

  const handleSelectChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
    <Select
      options={filteredSuppliers}
      onInputChange={handleInputChange}
      onChange={handleSelectChange}
      placeholder="Select a supplier..."
      isSearchable
    />
  );
};

export default SupplierDropdown;
