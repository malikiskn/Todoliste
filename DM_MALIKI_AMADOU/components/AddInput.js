import React, { useState } from "react";
import {View, TextInput, Text, TouchableOpacity,StyleSheet,Button} from 'react-native'


export default function AddInput({createTodo}) {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <View style={styles.ComponentContainer}>
    <View style={styles.InputContainer}>
     <TextInput
                style={styles.Input}
                onChangeText={onChangeText}
                placeholder="enter a new task"
                onSubmitEditing={createTodo}
                value={value}
            />
    </View>
    <View style={styles.SubmitButton}>
            <Button
                title="create task"
                onPress={createTodo}
            />
        </View>
    </View>
  );


}
const styles = StyleSheet.create({
    // liste: {
    //     margin: 12,
    //     paddingLeft: 6
    // },
    // content: {
    //     flexDirection:'row',
    //     marginLeft: 10,
    //     height: 6,
    // },
    // button:{
    //     padding: 6
    // }
    ComponentContainer : {
      flexDirection: 'row',
    },
    InputContainer:{
        flexDirection: 'row',
      borderRadius: 10
    },
    Input:{
        fontSize: 20,
      backgroundColor: 'white',
      width: 300,
      marginRight: 20,
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
    },
    SubmitButton:{
        width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'whitesmoke',
      marginBottom: 20,
      borderRadius: 50,
    }
    });




