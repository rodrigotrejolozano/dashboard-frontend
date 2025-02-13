import {  getMetricsAverageStockReducer } from '../slices/metrics-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useGetMetricsAverage() {
    const { state, allAverageStock} = useAppSelector(s => s.getMetricsAverageStock)
    const dispatch = useAppDispatch()
    const getAverageStock = (
        { name, price, stock } : 
        {   name?: string, price?: number, stock?: number},
    ) => {
        void dispatch(getMetricsAverageStockReducer(
            {  name , price , stock  },
        ))
    }

    return {
        state,
        allAverageStock,
        getAverageStock
    }
}
