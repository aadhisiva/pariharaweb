import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

function TableRowsPerPageDropDown({ itemsPerPage, setItemsPerPage }) {
  return (
    <div className="flex items-center text-sm">
      <span className="mr-1 font-bold">Show</span>
      <select
        className="border"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(e.target.value)}
        aria-label="Default select example"
      >
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span className="ml-1 font-bold">Entries</span>
    </div>
  );
}

export default TableRowsPerPageDropDown;
