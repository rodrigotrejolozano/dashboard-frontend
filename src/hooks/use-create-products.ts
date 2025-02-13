import { createProductReducer} from '../slices/products-reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { IProducts } from '../types/products-types'

export default function useCreateProduct() {
    const { state, productResponse } = useAppSelector(s => s.createProduct)
    const dispatch = useAppDispatch()
    const createProducts = (product: Omit<IProducts,'id'>) => {
        void dispatch(createProductReducer(
            product
        ))
    }
    return {
        state,
        product: productResponse,
        createProducts
    }
}
