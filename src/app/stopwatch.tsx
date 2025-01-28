import { View, Text,FlatList,StyleSheet } from 'react-native';
import React,{useState,useRef} from 'react';
import BoxComponent from "../components/BoxComponent";
import ButtonComponent from "../components/ButtonComponent";
import CustomButton from "../components/CustomButton";
import st from "../utils/styles";


const StopwatchScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time,setTime] = useState(0);
  const interval=useRef(null);
  const [newItem,setNewItem]=useState("");

  const toggleWatch=()=>{
    if(isRunning){
      clearInterval(interval.current);
    }else{
      const startTime=Date.now()- time;
      interval.current = setInterval(()=>{
        setTime(Date.now() - startTime);
         
      },100);
    }
    setIsRunning(!isRunning);
  };
  const reset=()=>{
    clearInterval(interval.current);
    setTime(0);
    setIsRunning(false);
  }
  const format= (time) =>{
    const hours=Math.floor(time/3600000).toString().padStart(2,'0');
    const mins=Math.floor(time/60000).toString().padStart(2,'0');
    const secs=Math.floor((time%60000)/1000).toString().padStart(2,'0');
    const milsecs=Math.floor((time%1000)/10).toString().padStart(2,'0');
    return `${hours}:${mins}:${secs}.${milsecs}`;
  }
  
  const [data,setData] = useState([
  ]);
  const deleteItem = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={st.textNormal}>{item.title}</Text>
      <CustomButton imageSource="../assets/images/delete.png" imageWidth="30" imageHeight="30" width="30" height="30" onpress={()=>{deleteItem(item.id)}}></CustomButton>
    </View>
  );
  const addTimeStamp = () =>{
    const hours=Math.floor(time/3600000).toString().padStart(2,'0');
    const mins=Math.floor(time/60000).toString().padStart(2,'0');
    const secs=Math.floor((time%60000)/1000).toString().padStart(2,'0');
    const milsecs=Math.floor((time%1000)/10).toString().padStart(2,'0');
    const newI={
      id:(data.length+1).toString(),
      title: `${hours}:${mins}:${secs}.${milsecs}`
    };
    setData([...data,newI]);
    setNewItem("");
  }
  
  return (
    <View style={st.bgContainer}>
       <BoxComponent url="stopwatch" text={format(time)} width="85%" height="20%"  fontSize="35" fontWeight="bold"/>
       <View style={{flexDirection:"row",height:"20%",alignContent:"center",justifyContent:"center"}}>
       
       <ButtonComponent imageSource={isRunning ? require("../assets/images/pause.png"): require("../assets/images/start.png")} imageWidth="30" imageHeight="30" onpress={toggleWatch} text={isRunning?"Pause" : "Start"} width="25%" height="55%" fontSize="30" fontWeight="bold"/>

       <ButtonComponent imageSource={require("../assets/images/reset.png")} imageWidth="30" imageHeight="30" onpress={reset} text="Reset" width="25%" height="55%"  fontSize="30" fontWeight="bold"/>
       
       <ButtonComponent imageSource={require("../assets/images/save.png")} imageWidth="30" imageHeight="30" 
       onpress={addTimeStamp} text="Save" width="25%" height="55%" fontSize="30" fontWeight="bold"/>
       </View>
       <View style={styles.list}>
       <FlatList data={data} renderItem={renderItem} keyExtractor={(item)=> item.id} />
       </View>
    </View>
  )
}
const styles=StyleSheet.create({
  list:{
    margin:0,
    padding:0,
    backgroundColor:"#1e1e2e",
    borderWidth:2,
    borderColor:"#45475a",
    borderRadius:20,
    height:"35%",
    width:"80%"
  },
  listItem:{
    backgroundColor:"#181825",
    borderWidth:1,
    borderColor:"#45475a",
    height:70,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  }
});
export default StopwatchScreen