import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import colors from './../Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import data from '../data';
class AddListModal extends Component {
backgroundColors = ["#32943e", "#2de443", "#FBC02D", "#2196F3", "#9C27B0", "#CDDC39", "#303F9F", "#E91E63"];
state = {
    name:"",
    color: this.backgroundColors[0]
};

  renderColors(){
     return this.backgroundColors.map(color=>{
         return(
             <TouchableOpacity key = {color}
             style = {[styles.colorSelect,{backgroundColor:color}]} 
             onPress= {()=>this.setState({color})} />
         )
     })
  }
  addTodo = () => {
     const {name, color} = this.state;
     /*data.push({
         name,
         color,
         todos:[]
     })*/
     const list = {name, color}
     this.props.addList(list);
     this.setState({name:""});
     this.props.closeModal();
  }
  render() {
    return (
      <KeyboardAvoidingView style = {styles.container} behavior = "padding">
          <TouchableOpacity 
          style = {{position:"absolute",top:60, right:30}} 
          onPress = {this.props.closeModal}>
              <Icon name = 'close' size ={24} color = {colors.black} />
          </TouchableOpacity>
          <View style = {{alignSelf:'stretch',marginHorizontal:30}}>
              <Text style = {styles.title}>Create Todo List</Text>
              <TextInput 
              style = {styles.input}
              placeholder = "List name" 
              onChangeText = {(text) => this.setState({name:text})}/>
              <View style = {{flexDirection:"row",justifyContent:"space-between",marginTop:30,marginBottom:20}}>
                  {this.renderColors()}
              </View>
              <TouchableOpacity style = {[styles.button, {backgroundColor:this.state.color}]} onPress = {()=>{this.addTodo()}}>
                  <Text style = {{color:colors.white,fontWeight:"600"}}>Create</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AddListModal;

const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       alignItems: 'center',
   },
   title:{
       fontSize:28,
       fontWeight:"800",
       color:colors.black,
       alignSelf:'center',
       marginBottom:30
   },
   input:{
       borderWidth:StyleSheet.hairlineWidth,
       borderColor:colors.blue,
       borderRadius:6,
       marginTop:10,
       height:50,
       fontSize:18
   },
   button:{
       marginTop:10,
       height:50,
       borderRadius:6,
       alignItems:'center',
       justifyContent:"center"
   },
   colorSelect:{
       width: 30,
       height:30,
       borderRadius:5,
       alignItems:"center"
       
   }
})
