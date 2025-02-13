import { getAllProductsReducer } from '../slices/products-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useGetAllProducts() {
    const { state, products ,pagination} = useAppSelector(s => s.getAllProducts)
    const dispatch = useAppDispatch()
    const getAllProducts = (
        { page, limit, name, price, stock } : 
        { page?: number, limit?: number, name?: string, price?: number, stock?: number
        },
    ) => {
        void dispatch(getAllProductsReducer(
            { page ,limit, name , price , stock  
            },
        ))
    }

    return {
        state,
        products,
        pagination,
        getAllProducts
    }
}
