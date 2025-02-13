import { useEffect } from 'react'
import CustomCard from '../common/custom-card'
import useGetMetricsAllProducts from '../../hooks/use-metrics-all-products';

const CardTotalProducts = () => {
    const { allProducts, getMeticsAllProducts, state } = useGetMetricsAllProducts();
    
        useEffect(() => {
            getMeticsAllProducts({});
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    return (
        <CustomCard
            title="Total de Productos"
            value={allProducts + "" || ""}
            isLoading={state.isLoading}
            description='Productos Totales'
        />
    )
}

export default CardTotalProducts