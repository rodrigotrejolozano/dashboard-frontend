import { getMetricsAllProductsReducer } from '../slices/metrics-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useGetMetricsAllProducts() {
    const { state, allProducts} = useAppSelector(s => s.getMetricsAllProducts)
    const dispatch = useAppDispatch()
    const getMeticsAllProducts = (
        { name, price, stock } : 
        {   name?: string, price?: number, stock?: number},
    ) => {
        void dispatch(getMetricsAllProductsReducer(
            {  name , price , stock  },
        ))
    }

    return {
        state,
        allProducts,
        getMeticsAllProducts
    }
}
