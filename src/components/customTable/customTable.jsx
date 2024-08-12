import React, { useState, useMemo, FC } from "react";
import { filterRows, paginateRows, sortRows } from "./helpers";
import { Pagination } from "./pagination";
import { Button, Col, Row, Table } from "react-bootstrap";
import { SearchBox } from "../common/searchBox";
import TableRowsPerPageDropDown from "../common/tableRowsPerPage";
import "./customTable.css";


export const CustomTable = ({
    columns,
    rows,
    handleClickModify = undefined,
    handleChangeRoutes = undefined,
    title
}) => {
    const [activePage, setActivePage] = useState(1);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({
        order: "asc",
        orderBy: "id",
    });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRows = useMemo(() => filterRows(rows, filters), [
        rows,
        filters,
    ]);
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [
        filteredRows,
        sort,
    ]);
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

    const count = filteredRows.length;
    const totalPages = Math.ceil(count / rowsPerPage);

    const handleSearch = (value, accessor) => {
        setActivePage(1);

        if (value) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [accessor]: value,
            }));
        } else {
            setFilters((prevFilters) => {
                const updatedFilters = { ...prevFilters };
                delete updatedFilters[accessor];

                return updatedFilters;
            });
        }
    };

    const handleSort = (accessor) => {
        setActivePage(1);
        setSort((prevSort) => ({
            order:
                prevSort.order === "asc" && prevSort.orderBy === accessor
                    ? "desc"
                    : "asc",
            orderBy: accessor,
        }));
    };

    const clearAll = () => {
        setSort({ order: "asc", orderBy: "id" });
        setActivePage(1);
        setFilters({});
    };

    const filteredData = (calculatedRows || []).filter(
        (item, i) => {
            if (searchTerm.trim() === "") {
                return rows;
            } else {
                return columns.some((column) =>
                    item[column.accessor]
                        ?.toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            }
        }
    );

    return (
        <div className="m-3 border p-2 rounded-xl bg-slate-200">
            <Row className="flex m-1 justify-between">
                <Col md={2}>
                    <TableRowsPerPageDropDown
                        itemsPerPage={rowsPerPage}
                        setItemsPerPage={setRowsPerPage}
                    />
                </Col>
                <Col md={4}>
                    <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </Col>
            </Row>
            <Table responsive size="sm" className="text-center" hover bordered>
                <thead >
                    <tr>
                        {columns.map((column, i) => {
                            const sortIcon = () => {
                                if (column.accessor === "Action") {
                                    return "";
                                }
                                if (column.accessor === sort.orderBy) {
                                    if (sort?.order === "asc") {
                                        return "⬆️";
                                    }
                                    return "⬇️";
                                } else {
                                    return "️↕️";
                                }
                            };
                            return (
                                <th
                                    className="text-xs"
                                    onClick={() => handleSort(column.accessor)}
                                    key={`${column.accessor}_${i}`}
                                >
                                    <span>{column.label}</span>
                                    {/* <button onClick={() => handleSort(column.accessor)}> */}
                                    {sortIcon()}
                                    {/* </button> */}
                                </th>
                            );
                        })}
                    </tr>
                    <tr>
                        {columns.map((column, i) => {
                            if (column.accessor === "Action") {
                                return <th key={i}></th>;
                            }
                            return (
                                <th key={i}>
                                    <input

                                        className="rounded-2xl text-xs"
                                        key={`${column.accessor}-search`}
                                        type="search"
                                        placeholder={`Search ${column.label}`}
                                        value={filters[column.accessor]}
                                        onChange={(event) =>
                                            handleSearch(event.target.value, column.accessor)
                                        }
                                    />
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, i) => {
                        return (
                            <tr key={i} onClick={handleChangeRoutes == undefined ? undefined : () => handleChangeRoutes(row)}>
                                {columns.map((column) => {
                                    if (column.accessor == "Status") {
                                        return (
                                            <td key={column.accessor} className="text-xs">
                                                <span style={{ border: '1px solid red' }} className="px-3 py-1 rounded-lg">{row[column.accessor] ?? "N/A"}</span>
                                            </td>
                                        );
                                    }
                                    if (column.accessor == "Action") {
                                        return (
                                            <td
                                                key={`${column.accessor} - ${i}}`}
                                                className="eachcolumn"
                                            >
                                                <Button
                                                    style={{ backgroundColor: "#13678C", fontSize: 10 }}
                                                    onClick={() => handleClickModify(row, "Modify")}
                                                >
                                                    {title ?? "Modify"}
                                                </Button>
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={column.accessor} className="text-xs">
                                            {row[column.accessor] ?? "N/A"}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {count > 0 ? (
                <Pagination
                    activePage={activePage}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    totalPages={totalPages}
                    setActivePage={setActivePage}
                />
            ) : (
                <p>No data found</p>
            )}

            <div>
                <p>
                    <button className="pointer" onClick={clearAll}>
                        Clear all
                    </button>
                </p>
            </div>
        </div>
    );
};
