// src/services/taskService.js
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const tasksRef = collection(db, 'tasks');

// Escuta em tempo real as tarefas de um status ('todo' ou 'done')
// Ordena no próprio app (evita precisar criar índice composto no Firestore)
export function subscribeToTasks(status, callback) {
  const q = query(tasksRef, where('status', '==', status));

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

    tasks.sort((a, b) => {
      const dateA = a.createdAt?.toMillis?.() ?? 0;
      const dateB = b.createdAt?.toMillis?.() ?? 0;
      return dateB - dateA; // mais recentes primeiro
    });

    callback(tasks);
  });
}

// Cria uma nova tarefa. dueDate é opcional (pode ser null)
export async function addTask(title, dueDate) {
  await addDoc(tasksRef, {
    title,
    dueDate: dueDate ? dueDate.toISOString() : null,
    status: 'todo',
    createdAt: serverTimestamp(),
    completedAt: null,
  });
}

// Move a tarefa para "concluída" e registra a data de conclusão
export async function completeTask(taskId) {
  await updateDoc(doc(db, 'tasks', taskId), {
    status: 'done',
    completedAt: serverTimestamp(),
  });
}

// Volta a tarefa para "a fazer" (opcional, útil caso conclua por engano)
export async function reopenTask(taskId) {
  await updateDoc(doc(db, 'tasks', taskId), {
    status: 'todo',
    completedAt: null,
  });
}

export async function deleteTask(taskId) {
  await deleteDoc(doc(db, 'tasks', taskId));
}
