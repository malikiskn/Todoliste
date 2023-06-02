const API_URL = 'http://localhost:4000'
import {TokenContext} from '../Context/Context';
//CONNEXION
const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'
export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

//INSCRIPTION
const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}

//TASKS_LISTES
const GET_TASKLISTS =
  'query($username: String!){taskLists(where: {owner: {username: $username}}){id title}}'

const CREATE_TASK_List = `mutation($title: String!, $username: String!) {
  createTaskLists(
    input: {
      title: $title,
      owner: { connect: { where: { username: $username } } }
    }
  ) {
    taskLists {
      id
      title
      owner {
        id
        username
      }
    }
  }
}
`
const DELETE_TASK_LISTS=
  `mutation($taskListID: ID!){deleteTaskLists(where: {id: $taskListID}){nodesDeleted}}`

export function createTaskLists(title, username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    query: CREATE_TASK_List,
    variables:{
      title: title,
      username: username
    }})}).then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTaskLists.taskLists[0]
    })
    .catch(error => {
      throw error
    })

}
export function getTaskLists (username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      query: GET_TASKLISTS,
      variables: {
        username: username
      }
    })
  }).then(response => {
    return response.json();
  })
  .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    })

}
export function deleteTaskLists(taskListID, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    query: DELETE_TASK_LISTS,
    variables:{
      taskListID: taskListID
      
    }})}).then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.deleteTaskLists
    })
    .catch(error => {
      throw error
    })

}


//TACHES
const ADD_TASK =
  `mutation($content:String!, $taskListID:ID!){
    createTasks(input: {
      content:$content, 
      belongsTo: {connect: {where: {id: $taskListID}}
    }}
  )
    {
      tasks{content}
    }
  }`
const GET_TASKS =
   'query($taskListId:ID!){tasks(where: {belongsTo: {id: $taskListId}}){id content done}}'

export function createTasks (content, taskListID, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    query: ADD_TASK,
    variables:{
      content: content,
      taskListID: taskListID
    }})}).then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTasks
    })
    .catch(error => {
      throw error
    })

}

export function getTasks (taskListId, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      query: GET_TASKS,
      variables: {
        taskListId: taskListId
      }
    })
  }).then(response => {
      return response.json()
    })
  .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.tasks
    })
    .catch(error => {
      throw error
    })


}

