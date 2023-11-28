import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    employe:null,
    internships: null,
    jobs: null,
    errors: [],
    isAuthenticated: false,

}

export const employeReducer = createSlice({
    name: 'employe',
    initialState,
    reducers: {
        addemploye: (state, action) => {
            state.employe = action.payload,
                state.isAuthenticated = true

        },
        removeemploye: (state, action) => {
            state.employe = null,
                state.isAuthenticated = false
        },
        iserror: (state, action) => {
            state.errors.push(action.payload)
        },
        removeerror: (state, action) => {
            state.errors = []
        },
        addjobs: (state, action) => {
            state.jobs = action.payload

        },
        addinternships: (state, action) => {
            state.internships = action.payload

        }



    },
})

export const { addemploye, removeemploye, iserror, removeerror,
    addjobs, addinternships } = employeReducer.actions

export default employeReducer.reducer