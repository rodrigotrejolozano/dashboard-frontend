import { deleteProductReducer} from '../slices/products-reducer'
import { useAppDispatch, useAppSelector } from './redux'

export default function useDeleteProduct() {
    const { state, message} = useAppSelector(s => s.deleteProduct)
    const dispatch = useAppDispatch()
    const deleteProducts = (id: number) => {
        void dispatch(deleteProductReducer(
            id
        ))
    }
    return {
        state,
        message,
        deleteProducts
    }
}
