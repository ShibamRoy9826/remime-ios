import { View,StyleSheet,TextInput } from 'react-native';
import React from 'react';



const NumberInput = (props:any) => {
  return (
      <TextInput style={styles.textInput} value={props.value} keyboardType="numeric" onChangeText={props.onchange} placeholder="" />
  )
}

const styles=StyleSheet.create({
    textInput:{
        color: "#cdd6f4",
        fontSize: 25,
        fontWeight:"bold",
        backgroundColor:"#1e1e2e",
        width:"10%",
        height:"35%",
        margin:20,
        borderRadius: 10,
        borderWidth:2,
        borderColor: "#45475a",
        textAlign:"center"
    }
});
export default NumberInput