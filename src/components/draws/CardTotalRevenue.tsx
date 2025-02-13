import { useEffect } from 'react'
import CustomCard from '../common/custom-card'
import useGetMetricsAllRevenue from '../../hooks/use-metrics-all-revenue';

const CardTotalRevenue = () => {
    const { allRevenue, getAllRevenue, state } = useGetMetricsAllRevenue();
    
        useEffect(() => {
            getAllRevenue({});
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
  return (
      <CustomCard
        title="Total de Ingresos"
        value={allRevenue + ""|| ""}
        isLoading={state.isLoading}
        description='Ingresos Totales'
      />
  )
}

export default CardTotalRevenue