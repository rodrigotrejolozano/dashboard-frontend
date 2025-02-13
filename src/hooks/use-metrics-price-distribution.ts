import {  getMetricsPriceDistributionReducer } from '../slices/metrics-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useGetMetricsPriceDistribution() {
    const { state, priceDistribution} = useAppSelector(s => s.getMetricsPriceDistribution)
    const dispatch = useAppDispatch()
    const getPriceDistribution = (
        { name, price, stock } : 
        {   name?: string, price?: number, stock?: number},
    ) => {
        void dispatch(getMetricsPriceDistributionReducer(
            {  name , price , stock  },
        ))
    }

    return {
        state,
        priceDistribution,
        getPriceDistribution
    }
}
