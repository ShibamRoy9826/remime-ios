import { useNavigation } from "expo-router";
import {View, Text, StyleSheet, Image ,Pressable} from "react-native";

const BoxComponent = (props:any) =>{
    const navigation = useNavigation();
    const moveTo=()=>{
        navigation.navigate(props.url);
    }
    return(
    <Pressable style={[styles.box,{width:props.width,height:props.height}]} onPress={moveTo}>
        <Image source={props.imageSource} style={{width:props.imageWidth,height:props.imageHeight}}/>
        <Text style={[styles.text,{fontSize:props.fontSize,fontWeight:props.fontWeight}]}>{props.text}</Text>
    </Pressable>
   );
}

const styles=StyleSheet.create(
    {
        box:{
            backgroundColor:"#1e1e2e",
            borderRadius:20,
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderWidth:1,
            borderColor: "#585b70",
            margin:15,
            alignItems:"center",
            justifyContent:"center"
        },
        text:{
            color:"#cdd6f4",
        }

    }
)
export default BoxComponent;