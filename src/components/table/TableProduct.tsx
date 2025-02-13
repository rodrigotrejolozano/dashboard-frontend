import { useState, useMemo, useCallback, type FC, JSX, useEffect } from 'react'
import { IProducts } from '../../types/products-types'
import CustomDropMenu from '../common/custom-drop-menu';
import CustomDropMenuItem from '../common/custom-drop-menu-item';
import { EyeFilledIcon } from '../icon/EyeFilledIcon';
import { EditIcon } from '../icon/EditIcon';
import { TrashIcon } from '../icon/TrashIcon';
import ProductModal from '../modal/ProductModal';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import useGetAllProducts from '../../hooks/use-get-all-products';
import CustomTable from '../common/custom-table';
import useStateDashboard from '../../hooks/use-state-dashboard';
import { VerticalDotsIcon } from '../icon/VerticalDotsIcon';
import DetailProductModal from '../modal/DetailProduct';
import useGetMetricsAllRevenue from '../../hooks/use-metrics-all-revenue';
import useGetMetricsAllProducts from '../../hooks/use-metrics-all-products';
import useGetMetricsTopExpensiveProducts from '../../hooks/use-metrics-top-expensive-products';
import useGetMetricsStockVSPrice from '../../hooks/use-metrics-stock-vs-price';
import useGetMetricsAverage from '../../hooks/use-metrics-average-stock';
import useGetMetricsPriceDistribution from '../../hooks/use-metrics-price-distribution';

interface Row extends IProducts {
    opciones: JSX.Element
}

const NAME_COLUMN = [
    { label: 'Id', value: 'id' },
    { label: 'Nombre', value: 'name' },
    { label: 'Precio', value: 'price' },
    { label: 'Stock', value: 'stock' },
    { label: 'Acciones', value: 'opciones' },
]

const TabProductComponent: FC = () => {
    const { products, getAllProducts, pagination, state } = useGetAllProducts();
    const [filters, setFilters] = useState({ type: "name", value: "" });
    const { limit } = useStateDashboard();
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [product, setProduct] = useState<IProducts | undefined>(undefined);
    const { getPriceDistribution } = useGetMetricsPriceDistribution();
    const { getAverageStock } = useGetMetricsAverage();
    const { getPriceVSStock } = useGetMetricsStockVSPrice();
    const { getTopExpensiveProducts } = useGetMetricsTopExpensiveProducts();
    const { getMeticsAllProducts } = useGetMetricsAllProducts();
    const { getAllRevenue } = useGetMetricsAllRevenue();

    const columnLabels = NAME_COLUMN.reduce<Record<keyof Row, string>>((acc, col) => {
        acc[col.value as keyof Row] = col.label
        return acc
    }, {
        id: '',
        name: '',
        price: '',
        stock: '',
        opciones: ''
    })

    const handleRefresh = useCallback(() => {
        getAllRevenue({
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,

        });
        getAverageStock({
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,
        });
        getPriceDistribution({
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,
        })
        getPriceVSStock({
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,
        })
        getMeticsAllProducts({
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,
        })
        getTopExpensiveProducts({
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    useEffect(() => {
        getAllProducts({
            page: currentPage, limit: limit,
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,
        });
        handleRefresh()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pagination.totalPages]);
    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, value: e.target.value }));
    }, []);

    const handleFilterTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters((prev) => ({ ...prev, type: e.target.value }));
    }, []);

    const handleSearch = useCallback(() => {
        getAllProducts({
            page: currentPage,
            limit: limit,
            name: filters.type === "name" ? filters.value : "",
            price: filters.type === "price" && filters.value ? Number(filters.value) : undefined,
            stock: filters.type === "stock" && filters.value ? Number(filters.value) : undefined,
        });
        handleRefresh()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, getAllProducts, currentPage, limit]);
    const handleDeleteProduct = useCallback((product: IProducts) => {
        setProduct(product);
        setOpenModalDelete(true);
    }, [])
    const handleUpdateProduct = useCallback((product: IProducts) => {
        setProduct(product);
        setOpenModalUpdate(true);
    }, [])
    const handleDetailProduct = useCallback((product: IProducts) => {
        setProduct(product);
        setOpenModalDetail(true);
    }, [])

    const formatData = useMemo(() => {
        if (Array.isArray(products)) {
            return products?.map((row) => ({
                id: row.id,
                name: row.name,
                price: row.price,
                stock: row.stock,
                opciones: (
                    <CustomDropMenu trigger={<>
                        <div
                        className='cursor-pointer hover:bg-gray-300 p-2 rounded-full'
                        >
                            <VerticalDotsIcon className="w-5 h-5 fill-neutral-800"></VerticalDotsIcon>
                        </div>
                    </>}>
                        <CustomDropMenuItem icon={<EyeFilledIcon className="w-5 h-5 fill-neutral-800" />} label="Ver" onClick={() => handleDetailProduct(row)} />
                        <CustomDropMenuItem icon={<EditIcon className="w-5 h-5 fill-blue-800" />} label="Editar" onClick={() => handleUpdateProduct(row)} />
                        <CustomDropMenuItem icon={<TrashIcon className="w-5 h-5 fill-red-800" />} label="Eliminar" onClick={() => handleDeleteProduct(row)} />
                    </CustomDropMenu>
                )
            })) ?? [];
        }
        return []
    }, [products, handleDetailProduct, handleDeleteProduct, handleUpdateProduct]);


    return (
        <div className="text-xs flex max-w-[900px] flex-col">
            <div className="flex  flex-wrap gap-2 justify-between my-4 items-center">
                <div
                className='gap-2 flex items-center'
                >
                    <select
                        className="border p-2 rounded"
                        value={filters.type}
                        onChange={handleFilterTypeChange}
                    >
                        <option value="name">Nombre</option>
                        <option value="price">Precio</option>
                        <option value="stock">Stock</option>
                    </select>

                    <input
                        type="text"
                        placeholder={`Filtrar`}
                        className="border p-2 rounded"
                        value={filters.value}
                        onChange={handleFilterChange}
                    />

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-600 transition "
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                </div>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-sm cursor-pointer shadow-md hover:bg-green-600 transition"
                    onClick={() => setModalOpen(true)}
                >
                    Crear Producto
                </button>
            </div>
            <div className="w-full">
                <CustomTable
                    currentPages={currentPage}
                    NAME_COLUMN={NAME_COLUMN}
                    columnLabels={columnLabels}
                    error={state.error?.success}
                    isLoading={state.isLoading}
                    formatData={formatData}
                    onPageChange={(page) => {
                        setCurrentPage(page)
                    }}
                    totalItems={pagination.totalItems}
                    totalPage={pagination.totalPages}
                />
            </div>
            <ProductModal
                isOpen={openModalUpdate}
                onClose={() => setOpenModalUpdate(false)}
                product={product}
            />
            <ConfirmDeleteModal
                isOpen={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                productId={product?.id || 0}
            />
            <DetailProductModal
                isOpen={openModalDetail}
                onClose={() => setOpenModalDetail(false)}
                id={product?.id || 0}
            />
            <ProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        </div>
    )
}
export default TabProductComponent
