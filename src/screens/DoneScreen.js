// src/screens/DoneScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';
import { subscribeToTasks, reopenTask, deleteTask } from '../services/taskService';

export default function DoneScreen() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToTasks('done', setTasks);
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
            isDone={true}
            onToggle={reopenTask}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma tarefa concluída ainda</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f5' },
  empty: { textAlign: 'center', marginTop: 40, color: '#888', fontSize: 15 },
});
