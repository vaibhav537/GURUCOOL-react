export const initialState = null;

export const reducer = (state, action) => {
    if(action.type === "USER"){
        return action.payload;
    }
    return state;
}

export const teacherInitialState = null;

export const teacherReducer = (stateTeacher, actionTeacher) => {
    if(actionTeacher.type === "TEACHER"){
        return actionTeacher.payload;
    }
    return stateTeacher;
};

export const studentInitialState = null;

export const studentReducer = (stateStudent, actionStudent) => {
    if(actionStudent.type === "STUDENT"){
        return actionStudent.payload;
    }
    return stateStudent;
};