import { configureStore } from '@reduxjs/toolkit'
import nav from './slices/navSlice'

export const store = configureStore({
    reducer: {
        nav
    }
})