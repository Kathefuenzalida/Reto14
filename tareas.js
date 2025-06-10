// tareas.js
import { promises as fs } from 'fs';

const tasksFile = 'tareas.json';

export async function readTasks() {
  try {
    const data = await fs.readFile(tasksFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveTasks(tasks) {
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
}