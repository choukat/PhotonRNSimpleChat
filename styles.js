import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    mainContaner: {
      height:'100%',
    },
    messagesList: {
      flex:1,
      flexDirection:'column',
      width:'100%',
    },
    bottomBar: {
      flexDirection:'row',
      bottom:0,
      minHeight:60,
      paddingHorizontal:10,
      paddingBottom:5
    },
    inputContainer: {
      flex:1,
      flexDirection:'row',
      margin:5,
      maxHeight:300,
    },
    actionBarContainer: {
      flexDirection:'column',
      justifyContent:'center',
      width:90,
    }
});

export default styles;
