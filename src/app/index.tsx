import { View, Text ,Pressable} from 'react-native';
import BoxComponent from "../components/BoxComponent";
import st from "../utils/styles";

const index = () => {
  return (
    <View style={st.bgContainer}>
      <Text style={st.heading}>Good Evening ☕</Text>
      <BoxComponent text="00:00:00 PM" width="85%" height="20%"  fontSize="35" fontWeight="bold"/>
      <View style={st.contentSmall}>
        <BoxComponent url="timer" text="Timer" width="40%" fontSize="30" fontWeight="bold"  imageSource={require("../assets/images/timer.png")} imageWidth="40" imageHeight="40"/>
        <BoxComponent url="stopwatch" text="Stopwatch" width="40%" fontSize="30" fontWeight="bold" imageSource={require("../assets/images/stopwatch.png")} imageWidth="40" imageHeight="40"/>
      </View>
      <View style={st.contentSmall}>
        <BoxComponent url="pomodoro" text="Pomodoro" width="40%" fontSize="30" fontWeight="bold" imageSource={require("../assets/images/tomato.png")} imageWidth="40" imageHeight="40"/>
        <BoxComponent url="settings" text="Settings" width="40%" fontSize="30" fontWeight="bold" imageSource={require("../assets/images/settings.png")} imageWidth="40" imageHeight="40"/>
      </View>
    </View>
  )
}

export default index;