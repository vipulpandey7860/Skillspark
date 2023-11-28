import axios from '@/utils/axios'
import {
    addstudent,
    iserror,
    removeerror,
    removestudent,
    addjobs,
    addinternships
    
} from '../Reducers/studentReducer'


export const asyncCurrentStudent = () => async (dispatch, getState) => {
    try {

        const { data } = await axios.post('/student');
        dispatch(addstudent(data.student));
    }
    catch (error) {
        dispatch(iserror(error.response?.data.message))
    }
}


export const asyncSignupStudent = (student) => async (dispatch, getState) => {

    try {

        const { data } = await axios.post('/student/signup', student);
        dispatch(asyncCurrentStudent());

    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncSigninStudent = (student) => async (dispatch, getState) => {

    try {

        const { data } = await axios.post('/student/signin', student);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncSignoutStudent = () => async (dispatch, getState) => {

    try {

        const { data } = await axios.get('/student/signout');
        dispatch(removestudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncUpdateStudent = (student) => async (dispatch, getState) => {

    try {
        const { _id } = getState().studentReducer.student;
        const { data } = await axios.post("/student/update/" + _id, student);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncAvatarStudent = (avatar) => async (dispatch, getState) => {

    try {
        const { _id } = getState().studentReducer.student;
        const { data } = await axios.post("/student/avatar/" + _id, avatar);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncResetPasswordStudent = (password) => async (dispatch, getState) => {

    try {
        const { _id } = getState().studentReducer.student;
        const { data } = await axios.post("/student/reset-password/" + _id, password);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncForgetPasswordStudent = (email) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/student/send-mail/", email);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncOTPPasswordStudent = (pwd) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/student/forget-link/", pwd);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteStudent = () => async (dispatch, getState) => {

    try {
        const { _id } = getState().studentReducer.student;
        const { data } = await axios.post("/student/delete/" + _id);
        dispatch(asyncSignoutStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncGetJobs = () => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/student/jobs");
        dispatch(addjobs(data.jobs))
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncGetInternships = () => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("/student/internships");
        dispatch(addinternships(data.internship))
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncApplyInternship = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("student/apply/internship/"+id);
        dispatch(asyncCurrentStudent());
        dispatch(asyncGetInternships());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncApplyJob = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("student/apply/job/"+id);
        dispatch(asyncCurrentStudent());
        dispatch(asyncGetJobs());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}



// ///////////////////////////////////resume education///////////////////////////////////////////////


export const asyncAddEducation = (edu) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/add-edu/",edu);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteEducation = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/delete-edu/"+id);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncEditEducation = (id,edu) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/edit-edu/"+id,edu);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


///////////////////////////////// resume job///////////////////////////////////////

export const asyncAddJob = (job) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/add-job/",job);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteJob = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/delete-job/"+id);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncEditJob = (id,job) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/edit-job/"+id,job);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


///////////////////////////////resume internship/////////////////////////////////////

export const asyncAddInternship = (intern) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/add-intern/",intern);
        dispatch(asyncCurrentStudent());
    } catch (error) {   
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteInternship = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/delete-intern/"+id);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncEditInternship = (id,intern) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/edit-intern/"+id,intern);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


///////////////////////////////resume courses/////////////////////////////////////

export const asyncAddCourses = (course) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/add-course/",course);
        dispatch(asyncCurrentStudent());
    } catch (error) {   
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteCourses = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/delete-course/"+id);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncEditCourses = (id,course) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/edit-course/"+id,course);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}




///////////////////////////////resume projects/////////////////////////////////////

export const asyncAddProjects = (project) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/add-project/",project);
        dispatch(asyncCurrentStudent());
    } catch (error) {   
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteProjects = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/delete-project/"+id);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncEditProjects = (id,project) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/edit-project/"+id,project);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}



///////////////////////////////resume skills/////////////////////////////////////

export const asyncAddSkills = (skill) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/add-skill/",skill);
        dispatch(asyncCurrentStudent());
    } catch (error) {   
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteSkills = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/delete-skill/"+id);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncEditSkills = (id,skill) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/edit-skill/"+id,skill);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}



///////////////////////////////resume Accomplishments/////////////////////////////////////

export const asyncAddAccomplishments = (accomplishment) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/add-accomplishment/",accomplishment);
        dispatch(asyncCurrentStudent());
    } catch (error) {   
        dispatch(iserror(error.response.data.message))
    }
}

export const asyncDeleteAccomplishments = (id) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/delete-accomplishment/"+id);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}


export const asyncEditAccomplishments = (id,accomplishment) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post("resume/edit-accomplishment/"+id,accomplishment);
        dispatch(asyncCurrentStudent());
    } catch (error) {
        dispatch(iserror(error.response.data.message))
    }
}