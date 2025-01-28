import { useNavigation } from "expo-router";
import {View, Text, StyleSheet, Image ,Pressable} from "react-native";

const CustomButton = (props:any) =>{
    const navigation = useNavigation();
   
    return(
    <Pressable style={[styles.box,{width:props.width,height:props.height}]} onPress={props.onpress}>
        <Text style={styles.text}>X</Text>
    </Pressable>
   );
}

const styles=StyleSheet.create(
    {
        box:{
            backgroundColor:"#f38ba8",
            borderRadius:10,
            borderWidth:2,
            borderColor: "#313244",
            margin:15,
            alignItems:"center",
            justifyContent:"center"
        },
        text:{
            color:"#cdd6f4",
            fontWeight:"bold"
        }
    }
)
export default CustomButton;