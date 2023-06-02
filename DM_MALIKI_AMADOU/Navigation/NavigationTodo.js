import React, { useState, useContext, useEffect } from "react";
import TodoListsScreen from "../Screen/TodoListsScreen";
import TodoList  from "../Screen/TodoList";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export function NavigationTodo () {
    return (
        <Stack.Navigator initialRouteName='List'>
      <Stack.Screen name='List' component={TodoListsScreen} />
      <Stack.Screen name='Details' component={TodoList} />
        </Stack.Navigator>
    )
  }