import { type TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import { AppStore, type AppDispatch, type RootState } from '../lib/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
