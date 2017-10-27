import axios from 'axios';

const GET_TASKS = "GET_TASKS"
    , GET_ID = "GET_ID"

let initialState = {
    tasks: [],
    taskId: null
}

export default function reducer( state = initialState, action ) {

    console.log( 'payload:', action.payload )
    switch( action.type ) {
        case GET_TASKS + '_FULFILLED':
            return Object.assign( {}, state, {tasks: action.payload} )
        case GET_ID:
            return Object.assign( {}, state, { taskId: action.payload } )
    }
}

export function getTaskId( id ) {
    return {
        type: GET_ID,
        payload: id
    }
}

export function getTasks() {
    const tasks = axios.get( 'https://practiceapi.devmountain.com/api/tasks' )
        .then( response => {
             return response.data
         } )

    return {
        type: GET_TASKS,
        payload: tasks
    }
}

export function updateTask( id, body ) {
    const task = axios.patch( `https://practiceapi.devmountain.com/api/tasks/${id}`, body )
        .then( response => {
            return response.data
        } )

        return {
            type: GET_TASKS,
            payload: task
        }
}

export function markCompleted( id ) {
    const task = axios.put( `https://practiceapi.devmountain.com/api/tasks/${id}` )
        .then( response => {
            return response.data
        } )

        return {
            type: GET_TASKS,
            payload: task
        }
}

export function deleteTask( id ) {
    const task = axios.delete( `https://practiceapi.devmountain.com/api/tasks/${id}` )
        .then( response => {
            return response.data
        } )

        return {
            type: GET_TASKS,
            payload: task
        }
}