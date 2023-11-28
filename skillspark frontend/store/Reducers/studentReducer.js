import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    student: null,
    internships: null,
    jobs: null,
    errors: [],
    isAuthenticated: false,

}

export const studentReducer = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addstudent: (state, action) => {
            state.student = action.payload,
                state.isAuthenticated = true

        },
        removestudent: (state, action) => {
            state.student = null,
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

export const { addstudent, removestudent, iserror, removeerror,
    addjobs, addinternships } = studentReducer.actions

export default studentReducer.reducer