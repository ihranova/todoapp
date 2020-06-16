/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ColorPropType,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import colors from './Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import data from './data';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

class App extends React.Component{
  state = {
    addTodoVisible: false
  }
  toggleAddTodoModal(){
    this.setState({addTodoVisible:!this.state.addTodoVisible});
  }
   render(){
    return (
      <View style = {styles.container}>
        <Modal animationType="slide" visible = {this.state.addTodoVisible} onRequestClose = {()=>this.toggleAddTodoModal()}>
          <AddListModal closeModal = {()=>this.toggleAddTodoModal()}/>
        </Modal>
        <View style = {{flexDirection:'row'}}>
          <View style = {styles.divider} />
          <Text style = {styles.title}>Todo <Text style = {{fontWeight:'300',color:colors.red}}>Lists</Text></Text>
          <View style = {styles.divider} />
        </View>

        <View style = {{marginVertical:30}}>
          <TouchableOpacity style = {styles.button} onPress = {()=>this.toggleAddTodoModal()}>
               <Icon name="plus" size={30} color={colors.orange} />
          </TouchableOpacity>
          <Text style = {styles.add}>Add a list</Text>

        </View>
        <View style = {{height:275,paddingLeft:40}}>
          <FlatList data = {data} keyExtractor = {item => item.name} horizontal = {true} showsHorizontalScrollIndicator = {false}
          renderItem = {({item})=> (
           <TodoList list = {item}/>
          )}/>
        </View>
      </View>
    );
   }
 
};

const styles = StyleSheet.create({
 container:{
   flex:1,
   justifyContent: "center",
   alignItems: 'center',
 },
 title:{
   fontSize:35,
   color:colors.black,
   fontWeight:'400',
   marginTop: -20,
   backgroundColor:colors.white,
   paddingHorizontal:20
 },
 divider:{
   backgroundColor:colors.lightblue,
   height:1,
   alignItems:'center',
   flex:1
 },
 button:{
   borderWidth:2,
   borderColor:colors.orange,
   borderRadius:4,
   paddingVertical:10,
   justifyContent:'center',
   alignItems:'center'
 },
 add:{
   fontSize:15,
   marginTop:20,
   color:colors.orange,
   textAlign:'center',
 }

});

export default App;
