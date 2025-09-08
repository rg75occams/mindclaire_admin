import { Fragment, useMemo, useState } from "react";
import { flexRender, getCoreRowModel } from "@tanstack/react-table";
import { getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronUp, ChevronDown, Settings } from "lucide-react";
import { FiChevronDown } from "react-icons/fi";

const CustomTable = ({ columns, data, isLoading = false, title }) => {
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [globalFilter, setGlobalFilter] = useState("");

    const filteredData = useMemo(() => {
        if (!globalFilter) return data;
        return data.filter((row) =>
            Object.values(row)?.some((val) =>
                String(val).toLowerCase().includes(globalFilter.toLowerCase())
            )
        );
    }, [data, globalFilter]);

    const table = useReactTable({
        data: filteredData, columns, state: { sorting, rowSelection, columnVisibility },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRows = table.getRowModel().rows.slice(startIndex, endIndex);

    return (
        <Fragment>
            <div className="grid grid-cols-12 gap-4 items-center mb-4">
                <div className="col-span-12 lg:col-span-3">
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>

                <div className="col-span-12 lg:col-span-9 flex lg:justify-end gap-4 items-center">
                    <input type="text" placeholder="Search..." value={globalFilter}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                            setPage(1);
                        }}
                        className={`md:w-1/2 w-full rounded-lg border-[1.5px] py-2 bg-transparent text-black outline-none ps-3
                        transition focus:border-blue-700 active:border-blue-700 disabled:cursor-default 
                        disabled:bg-gray-500 dark:bg-form-input dark:focus:border-blue-700 dark:text-white`}
                    />

                    {/* Column Visibility Dropdown */}
                    <div className="relative">
                        <details className="cursor-pointer">
                            <summary className="flex items-center gap-1 border rounded-md px-2.5 py-2 text-sm">
                                <Settings size={22} />
                            </summary>

                            <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-md p-2 z-20">
                                {table.getAllLeafColumns().map((col) => (
                                    <label key={col.id} className="flex items-center gap-2 text-sm py-1 capitalize">
                                        <input type="checkbox" checked={col.getIsVisible()}
                                            onChange={col.getToggleVisibilityHandler()}
                                        />
                                        {typeof col.columnDef.header === "string" ?
                                            col.columnDef.header : flexRender(col.columnDef.header, {})}
                                    </label>
                                ))}

                            </div>
                        </details>
                    </div>
                </div>
            </div>

            <div className="w-full relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                        <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <div className="overflow-x-auto max-h-[59vh]">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 sticky -top-[1px] z-10">
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id}>
                                    {hg.headers.map((header) => (
                                        <th key={header.id} colSpan={header.colSpan}
                                            className="!px-3 !py-2 border border-gray-300 text-center select-none"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div className="flex items-center justify-center gap-1 cursor-pointer">
                                                    {flexRender(header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: <ChevronUp size={14} />,
                                                        desc: <ChevronDown size={14} />,
                                                    }[header.column.getIsSorted()] ?? null}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {paginatedRows.length > 0 ? (
                                paginatedRows.map((row) => (
                                    <tr key={row.id} className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${row.getIsSelected()
                                        ? "bg-gray-300 dark:bg-gray-600" : "bg-white dark:bg-gray-800"}`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="!px-3 border border-gray-300 text-center text-sm">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center px-3 py-2 text-sm">
                    <span>
                        {startIndex + 1}-{Math.min(endIndex, table.getRowModel().rows.length)}{" "}
                        of {table.getRowModel().rows.length}
                    </span>

                    <div className="flex gap-2 items-center">
                        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                            className="px-2 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <button disabled={endIndex >= table.getRowModel().rows.length}
                            onClick={() => setPage((p) => p + 1)} className="px-2 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>

                        <div className="relative">
                            <select id="pageSize" name="pageSize" value={pageSize} className="border rounded px-2 py-1 
                                pr-5 appearance-none cursor-pointer" onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPage(1);
                                }}
                            >
                                {[5, 10, 20, 50].map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>

                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                                <FiChevronDown size={18} className="mt-0.5" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CustomTable