import { setLimit, setPage } from "../slices/state-dashboard-slice"
import { useAppDispatch, useAppSelector } from "./redux"

export default function useStateDashboard() {
    const {limit, page} = useAppSelector(s => s.stateDashboard)
    const dispatch = useAppDispatch()

    const handleSetLimit = (limit: number) => {
        void dispatch(setLimit(limit))
    }
    const handleSetPage = (page: number) => {
        void dispatch(setPage(page))
    }

    return {
        limit,
        page,
        handleSetLimit,
        handleSetPage
    }
}
