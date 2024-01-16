import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState } from './reducers'
import { AppDispatch } from '.'

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector<RootState>
export const useUserSelector = () => useAppSelector((state) => state.user)
export const useUserListSelector = () => useAppSelector((state) => state.userList)
export const useGroupsSelector = () => useAppSelector((state) => state.groups)
export const useLibrarySelector = () => useAppSelector((state) => state.library)
export const useEventSelector = () => useAppSelector((state) => state.events)
