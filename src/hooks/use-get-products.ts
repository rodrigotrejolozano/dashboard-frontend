import { getOneProductsReducer } from '../slices/products-reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { setProductId } from '../slices/products-one-slice'

export default function useGetProducts() {
    const { state, product } = useAppSelector(s => s.getOnProducts)
    const dispatch = useAppDispatch()
    const getOneProducts = ({ id }: { id?: number }) => {
        void dispatch(getOneProductsReducer(
            id ?? 0))
    }
    const setOneProducts = ({ id }: { id?:number }) => {
        dispatch(setProductId({
            id: id ?? 0
        }))
    }

    return {
        state,
        product,
        getOneProducts,
        setOneProducts
    }
}
