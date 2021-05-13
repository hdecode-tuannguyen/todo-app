import { Constants } from 'expo';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Switch, ScrollView} from 'react-native';


const Todo = ({text, isDone, onDelete, toggleDone}) => {
  return (
    <View style={styles.todo}>
      <Switch value={isDone} onValueChange={toggleDone}/>
      <Button onPress={onDelete} title='Delete' />
      <Text>{text}</Text>
    </View>
  )
}
let id = 0;

export default function App() {

  const [todos, setTodos] = useState([]);
  const addTodo = (text) => {
    setTodos([...todos, {id: id++, text: text + id, isDone: false}])
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  const toggleDoneTodo = (id) => {
    setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, isDone: !todo.isDone}))
  }
  return (
    <View style={styles.container}>
      <Text>Total todos: {todos.length}</Text>
      <Text>Total uncheck: {todos.filter(todo => !todo.isDone).length}</Text>
      <Button style={styles.button} onPress={() => addTodo('test')} title='Add new' />
      <ScrollView>
        {todos.map(todo => <Todo
        key = {todo.id}
        onDelete={() => deleteTodo(todo.id)}
        toggleDone={() => toggleDoneTodo(todo.id)}
        text={todo.text} 
        isDone={todo.isDone}
        />
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  container: {
    paddingTop: 20,

  },
  button: {
    color: 'red',
    backgroundColor: 'red',
    fontSize: 70,
  }
});
