import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SelectSearchForm = ({ options, onSelectChange, onSearchChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleSelectChange = (e) => {
    onSelectChange(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <Form className="d-flex">
      <div
        className="d-flex"
        style={{
          border: "1px solid #DEDEE1",
          borderRadius: "5px",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Select
          style={{
            width: "auto",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "transparent",
            fontSize: "small"
          }}
          onChange={handleSelectChange}
        >
          <option value="">Tất cả</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tên sách..."
          value={searchText}
          onChange={handleSearchChange}
          style={{
            width: "auto",
            border: "none",
            backgroundColor: "transparent",
            fontSize: "small",
            borderRadius: "0",
            paddingLeft: "10px",
          }}
        />
        <Button
          variant="light"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#F87555",
            borderRadius: "0",
            fontSize: "small",
          }}
        >
          <i className="bi bi-search"></i>
        </Button>
      </div>
    </Form>
  );
};

export default SelectSearchForm;
