// src/components/TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function formatDate(isoOrTimestamp) {
  if (!isoOrTimestamp) return null;
  const date = isoOrTimestamp.toDate ? isoOrTimestamp.toDate() : new Date(isoOrTimestamp);
  return date.toLocaleDateString('pt-BR');
}

export default function TaskItem({ task, onToggle, onDelete, isDone }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{task.title}</Text>

        {task.dueDate && (
          <Text style={styles.meta}>📅 Prazo: {formatDate(task.dueDate)}</Text>
        )}

        {isDone && task.completedAt && (
          <Text style={styles.metaDone}>✅ Concluída em: {formatDate(task.completedAt)}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.iconBtn}>
          <Ionicons
            name={isDone ? 'arrow-undo-outline' : 'checkmark-circle-outline'}
            size={24}
            color={isDone ? '#f5a623' : '#2e7d32'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={22} color="#c0392b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  title: { fontSize: 16, fontWeight: '600', color: '#222' },
  meta: { fontSize: 13, color: '#666', marginTop: 4 },
  metaDone: { fontSize: 13, color: '#2e7d32', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 8 },
  iconBtn: { marginLeft: 8 },
});
