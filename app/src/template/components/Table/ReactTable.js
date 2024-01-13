/*eslint-disable*/
import React from "react";
import {useTable, useFilters, useSortBy, usePagination} from "react-table";
import classnames from "classnames";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
import Select from "react-select";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import styles from "../../assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import {makeStyles} from "@material-ui/core/styles";
import CustomInput from "../CustomInput/CustomInput";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";

// Define a default UI for filtering
function DefaultColumnFilter({column: {filterValue, preFilteredRows, setFilter},}) {
    const count = preFilteredRows.length;
    return (
        <div>
            <CustomInput
                labelText={`Search ${count} records...`}
                formControlProps={{
                    fullWidth: true,
                }}
                onChange={(e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
            />
        </div>
    );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, {keys: [(row) => row.values[id]]});
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const useStyles = makeStyles(styles);

// Our table component
function ReactTable({columns, data, tableHeaderColor}) {
    const classes = useStyles();
    const [numberOfRows, setNumberOfRows] = React.useState({
        value: 10,
        label: "10 rows",
    });
    const [pageSelect, handlePageSelect] = React.useState({
        value: 0,
        label: "Page 1",
    });
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        visibleColumns,
        nextPage,
        pageOptions,
        pageCount,
        previousPage,
        canPreviousPage,
        canNextPage,
        setPageSize,
        gotoPage,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
            initialState: {pageSize: 10, pageIndex: 0},
        },
        useFilters, // useFilters!
        useSortBy,
        usePagination
    );

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    // const firstPageRows = rows.slice(0, 10);
    let pageSelectData = Array.apply(
        null,
        Array(pageOptions.length)
    ).map(function () {
    });
    let numberOfRowsData = [5, 10, 20, 25, 50, 100];
    return (
        <>
            <div className="ReactTable primary-pagination">
                <Table {...getTableProps()} className={classnames(classes.table, "rt-table")}>
                    {headerGroups !== undefined ? (
                        <TableHead className={classnames("rt-thead", classes[tableHeaderColor + "TableHeader"])}>
                            {headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}
                                          className={classnames(classes.tableHeadRow, "rt-tr")}>
                                    {headerGroup.headers.map((column, key) => {
                                        return (
                                            <TableCell
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className={classnames("rt-th rt-resizable-header",
                                                    classes.tableCell, classes.tableHeadCell)}
                                                key={key}
                                            >
                                                <div className="rt-resizable-header-content">
                                                    {column.render("Header")}
                                                </div>
                                                {/* Render the columns filter UI */}
                                                <div>
                                                    {headerGroup.headers.length - 1 === key
                                                        ? null
                                                        : column.canFilter
                                                            ? column.render("Filter")
                                                            : null}
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHead>
                    ) : null}
                    <TableBody {...getTableBodyProps()} className="rt-tbody">
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    {...row.getRowProps()}
                                    className={classnames(
                                        classes.tableBodyRow,
                                        "rt-tr",
                                        {" -odd": i % 2 === 0},
                                        {" -even": i % 2 === 1}
                                    )}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell {...cell.getCellProps()} className={classnames(
                                                "rt-td", classes.tableCell)}>
                                                {cell.render("Cell")}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <div className={classes.pagination}>
                    <div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={2}>
                                <Button
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}>
                                    Previous
                                </Button>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Select
                                    className="react-select primary"
                                    classNamePrefix="react-select"
                                    name="pageSelect"
                                    value={pageSelect}
                                    onChange={(value) => {
                                        gotoPage(value.value);
                                        handlePageSelect(value);
                                    }}
                                    options={pageSelectData.map((prop, key) => {
                                        return {
                                            value: key,
                                            label: "Page " + (key + 1),
                                        };
                                    })}
                                    placeholder="Choose Page"
                                />
                            </GridItem>
                            <GridItem md={4} sm={6} xs={12}>
                                <Select
                                    className="react-select primary"
                                    classNamePrefix="react-select"
                                    name="numberOfRows"
                                    value={numberOfRows}
                                    onChange={(value) => {
                                        setPageSize(value.value);
                                        setNumberOfRows(value);
                                    }}
                                    options={numberOfRowsData.map((prop) => {
                                        return {
                                            value: prop,
                                            label: prop + " rows",
                                        };
                                    })}
                                    placeholder="Choose Rows"
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={2}>
                                <Button
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}>
                                    Next
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default ReactTable;
