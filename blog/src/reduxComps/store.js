import { configureStore } from '@reduxjs/toolkit'
import allData from './reducer/allData'

const store = configureStore({
    reducer: {
        allData 
    }
})

export default store