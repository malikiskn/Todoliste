import React, { useState, useEffect } from "react";
import { Image, View, Text,TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import todoData from '../Helpers/todoData';

export default function TodoItem(props) {
    const [done, setDone] = useState(props.item.done);
    useEffect(()=>setDone(props.item.done), [props.item])
    return (
        <View style={styles.ComponentContainer}>
            <View style={styles.ListContainer}>
            <Switch value={done} onValueChange={(state) => {setDone(state); props.updateCount(state ? 1 : -1) }}/>
            
            <Text style={[styles.TextItem, { textDecorationLine: done ? 'line-through' : 'none' }]}>
                {props.item.content}

            </Text>
            </View>
            <TouchableOpacity onPress={() => {props.deleteTodo(props.item.id); props.updateCount(-1)}}     >
                <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }}  />
            </TouchableOpacity>

        </View>

    )

}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        textalign: 'center'
    },
    text_item: {
        marginLeft: 10,
        width: 100
    },
 ListContainer :{
  backgroundColor: 'whitesmoke',
  height: 'auto',
  width: 350,
  marginBottom: 30,
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
  ComponentContainer:{
  flexDirection: 'row',
  justifyContent: 'center',
  height: 'auto',
  width: 'auto',
  },
 TextItem :{
  color: 'black',
  width: 260,
  height: 'auto',
  fontSize: 20,
  marginTop: 10,
  marginRight: 20,
  fontFamily: 'poppins-regular',
 },

 TextTask :{
  color: 'goldenrod',
  fontSize: 15,
  marginRight: 20,
  fontFamily: 'poppins-regular',
  borderRadius: 10,
  width: 40,
}

})
