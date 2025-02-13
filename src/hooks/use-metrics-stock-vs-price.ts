import { getMetricsStockVSPriceReducer } from '../slices/metrics-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useGetMetricsStockVSPrice() {
    const { state, stockVsPrice} = useAppSelector(s => s.getMetricsPriceVsStock)
    const dispatch = useAppDispatch()
    const getPriceVSStock = (
        { name, price, stock } : 
        {   name?: string, price?: number, stock?: number},
    ) => {
        void dispatch(getMetricsStockVSPriceReducer(
            {  name , price , stock  },
        ))
    }

    return {
        state,
        stockVsPrice,
        getPriceVSStock
    }
}
