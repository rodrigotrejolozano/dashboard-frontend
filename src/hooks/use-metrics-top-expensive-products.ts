import { getMetricsTopExpensiveReducer } from '../slices/metrics-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useGetMetricsTopExpensiveProducts() {
    const { state, products} = useAppSelector(s => s.getMetricsTopExpensiveProducts)
    const dispatch = useAppDispatch()
    const getTopExpensiveProducts = (
        { name, price, stock } : 
        {   name?: string, price?: number, stock?: number},
    ) => {
        void dispatch(getMetricsTopExpensiveReducer(
            {  name , price , stock  },
        ))
    }

    return {
        state,
        products,
        getTopExpensiveProducts
    }
}
