import axios from '@/utils/axios'
import {
    addemploye,
    iserror,
    removeerror,
    removeemploye,
    addjobs,
    addinternships
    
} from '../Reducers/employeReducer'


export const asyncCurrentemploye = () => async (dispatch, getState) => {
    try {

        const { data } = await axios.post('/employe/current');
        dispatch(addemploye(data));
    }
    catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncSignupemploye = (employe) => async (dispatch, getState) => {

    try {

        const { data } = await axios.post('/employe/signup', employe);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncSigninemploye = (employe) => async (dispatch, getState) => {

    try {

        const { data } = await axios.post('/employe/signin', employe);
        dispatch(asyncCurrentemploye());
        
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncSignoutemploye = () => async (dispatch, getState) => {

    try {

        const { data } = await axios.get('/employe/signout');
        dispatch(removeemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncUpdateemploye = (employe) => async (dispatch, getState) => {

    try {
        const { _id } = getState().employeReducer.employe;
        const { data } = await axios.post("/employe/update/" + _id, employe);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncorganizationLogoemploye = (organizationlogo) => async (dispatch, getState) => {

    try {
        const { _id } = getState().employeReducer.employe;
        const { data } = await axios.post("/employe/organizationlogo/" + _id, organizationlogo);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncResetPasswordemploye = (password) => async (dispatch, getState) => {

    try {
        const { _id } = getState().employeReducer.employe;
        const { data } = await axios.post("/employe/reset-password/" + _id, password);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncForgetPasswordemploye = (email) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/employe/send-mail/", email);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncOTPPasswordemploye = (pwd) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/employe/forget-link/", pwd);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncCreateJob = (job) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/employe/job/create/", job);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncCreateInternship = (internship) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/employe/internship/create/", internship);
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncCloseInternship = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/employe/internship/close/"+id );
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncCloseJob = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/employe/job/close/"+id );
        dispatch(asyncCurrentemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteEmploye = () => async (dispatch, getState) => {

    try {
        const { _id } = getState().employeReducer.employe;
        const { data } = await axios.post("/employe/delete/" + _id);
        dispatch(asyncSignoutemploye());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}