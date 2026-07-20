// src/components/AddTaskModal.js
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTaskModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [wantsDate, setWantsDate] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  function handleSave() {
    if (!title.trim()) return;
    onSave(title.trim(), wantsDate ? dueDate : null);
    setTitle('');
    setWantsDate(false);
    setDueDate(new Date());
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.header}>Nova tarefa</Text>

          <TextInput
            style={styles.input}
            placeholder="O que precisa ser feito?"
            value={title}
            onChangeText={setTitle}
          />

          <TouchableOpacity
            style={styles.dateToggle}
            onPress={() => setWantsDate((v) => !v)}
          >
            <Text style={styles.dateToggleText}>
              {wantsDate ? '☑' : '☐'} Adicionar data (opcional)
            </Text>
          </TouchableOpacity>

          {wantsDate && (
            <>
              <TouchableOpacity
                style={styles.dateBtn}
                onPress={() => setShowPicker(true)}
              >
                <Text>📅 {dueDate.toLocaleDateString('pt-BR')}</Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={dueDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={(event, selected) => {
                    setShowPicker(Platform.OS === 'ios');
                    if (selected) setDueDate(selected);
                  }}
                />
              )}
            </>
          )}

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 14,
  },
  dateToggle: { marginBottom: 10 },
  dateToggleText: { fontSize: 15, color: '#333' },
  dateBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  buttonsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 10 },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 16 },
  cancelText: { color: '#999', fontSize: 15 },
  saveBtn: { backgroundColor: '#2e7d32', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  saveText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
