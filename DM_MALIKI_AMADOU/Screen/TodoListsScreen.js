import TodoList from './TodoList'
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, TouchableOpacity, } from 'react-native';
import { getTaskLists, createTaskLists, deleteTaskLists } from '../API/todoAPI';
import { TokenContext, UsernameContext } from '../Context/Context'
import { MaterialIcons } from "@expo/vector-icons";

const TodoListsScreen = ({ navigation }) => {

	const [token, setToken] = useContext(TokenContext)
	const [username, setUsername] = useContext(UsernameContext)
	const [newTodoText, setNewTodoText] = useState("");
	const [count, setCount] = useState(0)
	const [lists, setLists] = useState(null);
	const [error, setError] = useState("");


	const createTodoList = () => {
		console.log(newTodoText);
		createTaskLists(newTodoText, username, token).then(data => {
			setLists([...lists, data])
		}).catch(err => {
			setError(err.message)
		})
	}

	function getLists() {
		getTaskLists(username, token).then(res => {
			setLists(res);
			console.log(res)
		}).catch(err => {
			setError(err.message);
		})
	}
	function deleteTodoLists(id) {
		deleteTaskLists(id, token).then(res => {
			const newTodoLists = lists.filter(item => item.id != id)
			setLists(newTodoLists)

		}).catch(err => {
			setError(err.message);
		})

	}

	useEffect(() => {
		getLists();
	}, []);

	return (
		<View>
			<Text>TodoList</Text>
			<TextInput
				onChangeText={(value) => setNewTodoText(value)}
				placeholder="enter a new tasklist"
				onSubmitEditing={createTodoList}
				value={newTodoText}
			/>
			<Button
				title="create Tasklist"
				onPress={createTodoList}
			/>
			<Text>{error}</Text>
			<FlatList
        data={lists}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", {
                item: item,
              })
            }
          >
            <View >
              <View >
                <Text>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteTodoLists(item.id)}>
                <MaterialIcons name="delete" size={35} color="#223152" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
		</View>
	)
}



export default TodoListsScreen;
