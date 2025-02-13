import {  getMetricsRevenueReducer } from '../slices/metrics-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useGetMetricsAllRevenue() {
    const { state, allRevenue} = useAppSelector(s => s.getMetricsAllRevenue)
    const dispatch = useAppDispatch()
    const getAllRevenue = (
        { name, price, stock } : 
        {   name?: string, price?: number, stock?: number},
    ) => {
        void dispatch(getMetricsRevenueReducer(
            {  name , price , stock  },
        ))
    }

    return {
        state,
        allRevenue,
        getAllRevenue
    }
}
