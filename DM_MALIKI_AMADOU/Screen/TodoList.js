import React,{useEffect, useState, useContext} from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import todoData  from '../Helpers/todoData';
import TodoItem from '../components/TodoItem';
import {createTasks, getTaskLists, getTasks} from '../API/todoAPI';
import {TokenContext, UsernameContext} from '../Context/Context'
import AddInput from "../components/AddInput";

export default function TodoList({route}){

    const [token, setToken] = useContext(TokenContext)
    const [username, setUsername] = useContext(UsernameContext)
    const [todos, setTodos] = useState(null)
    const [count,setCount] = useState(0)
    const [newTodoText,setNewTodoText] = useState("");
    const [error, setError] = useState("");

    const updateCount = offset => {
        setCount(count + offset)
    }

    const deleteTodo = (id) => {
        const newTodos = todos.filter(item => item.id != id)
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
    }

    const createTodo = () =>{
        console.log(newTodoText);

        createTasks(newTodoText, route.params.item.id, token).then(data => {
            setTodos([...todos,data])
        }).catch(err=>{
            setError(err.message)
        })
      }
    const deleteList = () =>{
        props.deleteTodoLists(route.params.item.id, token)
    }
    const checkAll = () => {
        const newtodos = todos.map((item) => {return {id: item.id, content: item.content, done: true }})
        console.log(newtodos)
        setTodos(newtodos)
    }

    const unCheckAll = () => {
        const newtodos = todos.map((item) => {return {id: item.id, content: item.content, done: false }})
        console.log(newtodos)
        setTodos(newtodos)
    }

    function getTodo(){
        getTasks(route.params.item.id, token).then(res => {
            console.log(res)
            setTodos(res);
            setCount(res.filter((item)=>item.done).length)
        }).catch(err => {
            console.log(err)
            setError(err.message);
        })
    }

    useEffect(() => {
        getTodo();
    }, []);

    return (
        <View >
            <Text>{route.params.item.title}</Text>
             <FlatList
                style={styles.liste}
                data={todos}
                renderItem={({item}) => <TodoItem item={item}
                    updateCount={updateCount} deleteTodo={deleteTodo}
            />}/>
            <Text>{error}</Text>
                <AddInput createTodo={createTodo} />
             <Button title="Delete tasklist" onPress={deleteList}/>
            <Button title="check" onPress={checkAll}/>
            <Button title="uncheck" onPress={unCheckAll}/>
            <h3>Le nombre de TodoItem réalisé est :{count}</h3> 
        </View>
  )
}

const styles = StyleSheet.create({
liste: {
    margin: 12,
    paddingLeft: 6
},
content: {
    flexDirection:'row',
    marginLeft: 10,
    height: 6,
},
button:{
    padding: 6
}

});
