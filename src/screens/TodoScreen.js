// src/screens/TodoScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import { subscribeToTasks, addTask, completeTask, deleteTask } from '../services/taskService';

export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToTasks('todo', setTasks);
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            isDone={false}
            onToggle={completeTask}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma tarefa pendente 🎉</Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={addTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f5' },
  empty: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 15 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#2e7d32',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
