import axios from 'axios'

const endpoint = 'https://16xkdlfrol.execute-api.us-east-1.amazonaws.com/deployment/routines'

const routinesPost = (routine) => ({
    type: 'ROUTINES_POST',
    routine: routine
})

export const addRoutine = (routine) => (dispatch, getState) => {
    return new Promise((resolve, reject) => { 
        axios.post(endpoint, routine, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken
            } 
        })
            .then(response => {
                if (response.status === 201) {
                    dispatch(routinesPost(response.data))
                    resolve(response)
                }
                else {
                    reject("Unknown POST response code (expected 201, received " + response.status + ").")
                }
                
            }, error => {
                reject(error)
            })
        })
}

const routinesPut = (routine) => ({
    type: 'ROUTINES_PUT',
    routine: routine
})

export const updateRoutine = (routine) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.put(endpoint + "/" + routine.id, routine, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken
            } 
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch(routinesPut(response.data))
                    resolve(response)
                }
                else {
                    reject("Unknown PUT response code (expected 200, received " + response.status + ").")
                }
            }, error => {
                reject(error)
            })
        })
}

const routinesGet = (routines) => ({
    type: 'ROUTINES_GET',
    routines: routines
})

export const fetchRoutines = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.get(endpoint, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken 
            }
        })
            .then(response => {
                dispatch(routinesGet(response.data))
                resolve(response)
            }, error => {
                reject(error)
            })    
    })
}

const routinesDelete = (id) => ({
    type: 'ROUTINES_DELETE',
    id: id
})

export const deleteRoutine = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.delete(endpoint + "/" + id, {
            headers: {
                "Authorization": getState().security.session.idToken.jwtToken
            } 
        })
            .then(response => {
                if (response.status === 204) {
                    dispatch(routinesDelete(id))
                    resolve(response)
                }
                else {
                    reject("Unknown DELETE response code (expected 204, received " + response.status + ").")
                }
            }, error => {
                reject(error)
            })
    })
}