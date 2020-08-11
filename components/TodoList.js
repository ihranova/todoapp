import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import colors from './../Colors';
import AddTodoModal from './AddTodoModal';
export default class TodoList extends React.Component{
    state = {
        visible:false
    }
    toggleListMofdal(){
        this.setState({visible:!this.state.visible});
    }
 
    render(){
        const list = this.props.list;
        //console.log(list.name);
        const complectedCount = list.todos.filter(todo => todo.complected).length;
        const remainingCount = list.todos.length - complectedCount;
        return (
            <View>
                <Modal animationType="slide" visible = {this.state.visible} onRequestClose = {()=>this.toggleListMofdal()} >
                    <AddTodoModal list = {list} closeModal = {()=>this.toggleListMofdal()}  updateList = {this.props.updateList}/>
                </Modal>
            <TouchableOpacity  style={[styles.listContainer, { backgroundColor: list.color }]} onPress = {()=>this.toggleListMofdal()}>
                <Text style={styles.listTitle}>{list.name}</Text>
    
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>{complectedCount}</Text>
                        <Text style={styles.subtitle}>Complected</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 40,
        fontWeight: '200',
        color: colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.white
    }
});
