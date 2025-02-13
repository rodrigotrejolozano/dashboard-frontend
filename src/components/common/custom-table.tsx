import { useCallback, Fragment, JSX } from "react";
import { SpinnerIcon } from "../icon/SpinnerIcon";

interface TableRow {
    [key: string]: string | number | boolean | JSX.Element;
    id: number;
}
interface TableProps<T> {
    totalPage: number;
    totalItems: number;
    isLoading: boolean;
    error?: boolean;
    onPageChange: (page: number) => void;
    columnLabels: Record<keyof T, string>;
    formatData: TableRow[];
    currentPages: number;
    NAME_COLUMN: { label: string; value: string }[];
}

const CustomTable = <T extends { id: number;[key: string]: string | number | boolean }>({
    isLoading,
    error,
    NAME_COLUMN,
    columnLabels,
    formatData,
    totalPage,
    totalItems,
    currentPages,
    onPageChange,
}: TableProps<T>) => {
    const handlePageChange = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPage) {
                onPageChange(page);
            }
        },
        [onPageChange, totalPage]
    );

    const renderPagination = useCallback(() => {
        const paginationButtons: JSX.Element[] = [];
        for (let i = 1; i <= totalPage; i++) {
            if (i === 1 || i === totalPage || (i >= currentPages - 1 && i <= currentPages + 1)) {
                paginationButtons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 border cursor-pointer rounded-lg shadow-sm transition-all duration-200 ${currentPages === i
                                ? "bg-blue-500 text-white hover:bg-blue-700"
                                : "bg-white bg-opacity-40 backdrop-blur-md text-gray-700 hover:bg-opacity-70"
                            }`}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === currentPages - 2 || i === currentPages + 2) &&
                !paginationButtons.some((button) => button.key?.toString().includes("ellipsis"))
            ) {
                paginationButtons.push(
                    <span key={`ellipsis-${i}`} className="px-2 text-gray-500">
                        ...
                    </span>
                );
            }
        }

        return (
            <div className="flex items-center justify-center mt-4 gap-2">
                <button
                    onClick={() => handlePageChange(Math.max(currentPages - 1, 1))}
                    className="px-4 py-2 border hover:bg-blue-500 cursor-pointer rounded-lg shadow-sm bg-white bg-opacity-40 backdrop-blur-md hover:bg-opacity-70 transition-all duration-200"
                >
                    &lt;
                </button>
                {paginationButtons}
                <button
                    onClick={() => handlePageChange(Math.min(currentPages + 1, totalPage))}
                    className="px-4 py-2 border hover:bg-blue-500 cursor-pointer rounded-lg shadow-sm bg-white bg-opacity-40 backdrop-blur-md hover:bg-opacity-70 transition-all duration-200"
                >
                    &gt;
                </button>
            </div>
        );
    }, [currentPages, handlePageChange, totalPage]);

    return (
        <div className="text-sm flex flex-col  w-full">
            <div className="mb-4 text-md text-start font-medium text-gray-700">Total de Productos: {totalItems}</div>
            <div className="w-full max-w-6xl overflow-auto rounded-lg shadow-lg bg-white bg-opacity-40 backdrop-blur-lg ">
                <table className="w-full border-collapse h-fit text-left rounded-lg">
                    <thead className="bg-gradient-to-r  rounded-3xl border-b-1 bg-neutral-600 bg-opacity-40 ">
                        <tr>
                            <td colSpan={NAME_COLUMN.length} className="px-6 font-semibold te py-4 text-center text-white">
                                Tabla de Productos
                            </td>
                        </tr>
                    </thead>
                    <thead className="bg-gradient-to-r bg-neutral-600 bg-opacity-40 rounded-lg text-white">
                        <tr>
                            {NAME_COLUMN.map((column) => (
                                <th key={column.value} className="px-6 py-3 border-b-2 font-semibold text-white">
                                    {columnLabels[column.value as keyof T]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        {isLoading ? (
                            <tr>
                                <td colSpan={NAME_COLUMN.length} className="px-6 py-4 text-center">
                                    <SpinnerIcon />
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={NAME_COLUMN.length} className="px-6 py-4 text-center text-red-500">
                                    Error al obtener los datos
                                </td>
                            </tr>
                        ) : formatData.length === 0 ? (
                            <tr>
                                <td colSpan={NAME_COLUMN.length} className="px-6 py-4 text-center text-gray-600">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        ) : (
                            formatData.map((row,i) => (
                                <Fragment key={row.id}>
                                    <tr className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200  transition-all duration-200`}>
                                        {NAME_COLUMN.map((column) => (
                                            <td
                                                key={`${row.id}-${column.value}`}
                                                className="px-6 py-4  text-gray-800 bg-opacity-50"
                                            >
                                                {row[column.value]}
                                            </td>
                                        ))}
                                    </tr>
                                </Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {totalPage > 1 && renderPagination()}
        </div>
    );
};

export default CustomTable;
