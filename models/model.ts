import { CreateTask, BaseTask } from '../shared/types/types';
import { createTimeStamp, readJSON, writeJSON } from '../utils/utils';
import path from 'path';

export class Model {
  DB_URL: string = path.join(__dirname, '../database/database.json');

  async create(task: CreateTask): Promise<BaseTask> {
    try {
      const tasks = await readJSON<BaseTask[]>(this.DB_URL);
      const newTask = {
        id: Math.round(Math.random() * (99999999 - 1) + 1),
        createdAt: createTimeStamp(),
        completed: {},
        ...task,
      };
      tasks.push(newTask);
      await writeJSON<BaseTask[]>(this.DB_URL, tasks);
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async getAll(): Promise<BaseTask[]> {
    try {
      return await readJSON<BaseTask[]>(this.DB_URL);
    } catch (error) {
      console.error('Error get tasks:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<BaseTask>): Promise<BaseTask> {
    try {
      const tasks = await readJSON<BaseTask[]>(this.DB_URL);
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      tasks.splice(taskIndex, 1, {
        ...tasks[taskIndex],
        ...data,
      });
      await writeJSON<BaseTask[]>(this.DB_URL, tasks);
      return tasks[taskIndex];
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<BaseTask> {
    try {
      const tasks = await readJSON<BaseTask[]>(this.DB_URL);
      const task = tasks.find((task) => task.id === id);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (error) {
      console.error('Error finding task', error);
      throw error;
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const tasks = await readJSON<BaseTask[]>(this.DB_URL);
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      tasks.splice(taskIndex, 1);
      await writeJSON<BaseTask[]>(this.DB_URL, tasks);
      return `Task ${id} deleted successfully`;
    } catch (error) {
      console.error('Error deleting task', error);
      throw error;
    }
  }
}
