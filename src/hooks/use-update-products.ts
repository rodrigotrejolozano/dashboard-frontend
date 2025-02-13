import { updateProductReducer } from '../slices/products-reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { IProducts } from '../types/products-types'

export default function useUpdateProduct() {
    const { state, productResponse } = useAppSelector(s => s.updateProduct)
    const dispatch = useAppDispatch()
    const updateProducts = (product: IProducts) => {
        void dispatch(updateProductReducer(
            product
        ))
    }
    return {
        state,
        product: productResponse,
        updateProducts
    }
}
