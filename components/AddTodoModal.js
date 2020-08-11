import React, { Component } from 'react';
import { View, Animated, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import Colors from '../Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Swipeable} from 'react-native-gesture-handler';

class AddTodoModal extends Component {
  state = {
    //name: this.props.list.name,
    //color: this.props.list.color,
    //todos: this.props.list.todos
    newTodo: ""
  }
  toggleTodoComplected = index =>{
    let list = this.props.list;
    list.todos[index].complected = !list.todos[index].complected;
    this.props.updateList(list);
  }
  renderTodo = ({ item, index }) => {
    //console.log(item);
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity style={styles.todobutton} onPress = {()=> this.toggleTodoComplected(index)}>
          <Ionicons name={item.complected ? 'ios-square' : "ios-square-outline"} size={24} color={item.complected ? colors.lightGray : colors.black} />
          <Text style={[styles.todo, { color: item.complected ? colors.lightGray : colors.black, textDecorationLine: item.complected ? "line-through" : "none" }]}>{item.title}</Text>
        </TouchableOpacity>

      </View>
    );
  };

  addTodo = () =>{
    let list = this.props.list;
    list.todos.push({title:this.state.newTodo, complected: false});
    this.props.updateList(list);
    this.setState({
      newTodo:""
    })
    Keyboard.dismiss();
  }

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const complected = list.todos.filter(todo => todo.complected).length;
    return (
      <KeyboardAvoidingView behavior="padding" style = {{flex:1}}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={{ position: 'absolute', top: 60, right: 30 }} onPress={() => this.props.closeModal()}>
            <Icon name="close" size={24} color={Colors.black} />
          </TouchableOpacity>
          <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {complected} of {taskCount} tasks</Text>
            </View>
          </View>
          <View style={[styles.section, { flex: 3 }]}>
            <FlatList data={list.todos}
              contentContainerStyle={{ paddingHorizontal: 30, paddingVertical: 60 }}
              renderItem={this.renderTodo} keyExtractor={(_, index) => index.toString()} />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput style={[styles.input, { borderColor: list.color }]} onChangeText = {text=>this.setState({newTodo:text})} value = {this.state.newTodo}/>
            <TouchableOpacity style={[styles.button, { backgroundColor: list.color }]} onPress = {()=>this.addTodo()}>
              <Icon name="plus" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default AddTodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  section: {
    flex: 1,
    alignSelf: "stretch"

  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 50,
    marginTop: 40,
    borderBottomWidth: 2

  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.black
  },
  taskCount: {
    color: Colors.lightGray,
    marginVertical: 10
  },
  footer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 10,
    paddingHorizontal: 10
  },
  button: {
    height: 40,
    borderRadius: 6,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',

  },
  todoContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'

  },
  todobutton: {
    flexDirection: 'row'
  },
  todo: {
    marginLeft: 10,
    marginTop: 1,
    fontSize: 17,
    fontWeight: "500"
  }
})