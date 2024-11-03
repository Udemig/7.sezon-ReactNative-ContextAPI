import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {TaskContext} from '../context/TaskContext';
import Loader from '../componets/Loader';
import Error from '../componets/Error';

const TaskScreen = () => {
  const {
    tasks,
    loading,
    error,
    removeTask,
    newTaskTitle,
    setNewTaskTitle,
    addTask,
  } = useContext(TaskContext);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text style={styles.title}>
                  {item.title.length > 20
                    ? item.title.slice(0, 30) + '...'
                    : item.title}
                </Text>
                <Button
                  title="Remove"
                  color={'red'}
                  onPress={() => removeTask(item.id)}
                />
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              value={newTaskTitle}
              placeholder="New Task Title"
              onChangeText={setNewTaskTitle}
              style={styles.input}
            />

            <Button title="Add Task" onPress={() => addTask(newTaskTitle)} />
          </View>
        </>
      )}
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#2F3645',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 10,
    shadowColor: '#000',
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderWidth: 1,
    width: '75%',
    padding: 5,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});
