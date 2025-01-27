import {StyleSheet} from "react-native";

const st=StyleSheet.create({
    bgContainer:{
        backgroundColor:"#11111b",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%" 
    },
    heading:{
        color:"#cdd6f4",
        fontSize:30,
        fontWeight:"bold"
    },
    content:{
        width:"100%",
        height:"50%",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"center",
        margin:0,
    },
    contentSmall:{
        flexDirection:"row"
    },
    
});

export default st;