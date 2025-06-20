import { Model } from '../models/model';
import { CreateTask, BaseTask } from '../shared/types/types';
import { createTimeStamp, createTimeStampWithSkipDays } from '../utils/utils';

export class Service {
  constructor(private readonly model: Model) {}

  async addNewTask(task: CreateTask): Promise<BaseTask> {
    try {
      if (!task.name || !task.freq) {
        throw new Error('Task name and freq required');
      }
      return await this.model.create(task);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async getTasks(): Promise<BaseTask[]> {
    try {
      return await this.model.getAll();
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  }

  async doneTask(id: number): Promise<BaseTask> {
    try {
      if (!id) {
        throw new Error('Task id required');
      }
      const task = await this.model.findOne(id);
      task.completed[createTimeStamp()] = true;
      return await this.model.update(id, task);
    } catch (error) {
      console.error('Error done task:', error);
      throw error;
    }
  }

  async showStats(id: number) {
    try {
      if (!id) {
        throw new Error('Task id required');
      }
      const task = await this.model.findOne(id);
      const now = createTimeStampWithSkipDays();
      const created = new Date(task.createdAt);

      const msPerDay = 1000 * 60 * 60 * 24;
      const maxPeriodDays = 30;

      const daysSinceCreated = Math.floor((now.getTime() - created.getTime()) / msPerDay) + 1;
      const periodDays = Math.min(maxPeriodDays, daysSinceCreated);

      const from = new Date(now.getTime() - periodDays * msPerDay);

      const completedPeriods = new Set<string>();

      for (const timestamp of Object.keys(task.completed)) {
        const date = new Date(timestamp);

        if (date < created || date < from || date > now) continue;

        let key: string;

        if (task.freq === 'daily') {
          const y = date.getUTCFullYear();
          const m = String(date.getUTCMonth() + 1).padStart(2, '0');
          const d = String(date.getUTCDate()).padStart(2, '0');
          key = `${y}-${m}-${d}`;
        } else if (task.freq === 'weekly') {
          const year = date.getUTCFullYear();
          const jan1 = new Date(Date.UTC(year, 0, 1));
          const days = Math.floor((date.getTime() - jan1.getTime()) / msPerDay);
          const week = Math.floor(days / 7);
          key = `${year}-W${week}`;
        } else {
          const y = date.getUTCFullYear();
          const m = String(date.getUTCMonth() + 1).padStart(2, '0');
          key = `${y}-${m}`;
        }

        completedPeriods.add(key);
      }

      let expected = 0;

      if (task.freq === 'daily') {
        expected = periodDays;
      } else if (task.freq === 'weekly') {
        expected = Math.ceil(periodDays / 7);
      } else if (task.freq === 'monthly') {
        expected =
          (now.getUTCFullYear() - created.getUTCFullYear()) * 12 +
          (now.getUTCMonth() - created.getUTCMonth()) +
          1;
        expected = Math.min(expected, 1);
      }

      const completed = completedPeriods.size;
      const percent = expected === 0 ? 0 : Math.round((completed / expected) * 100);

      return { completed, expected, percent };
    } catch (error) {
      console.error('Error get stats:', error);
      throw error;
    }
  }

  async deleteTask(id: number): Promise<string> {
    try {
      if (!id) {
        throw new Error('Task id required');
      }
      return await this.model.delete(id);
    } catch (error) {
      console.error('Error delete task:', error);
      throw error;
    }
  }

  async updateTask(id: number, data: Partial<BaseTask>): Promise<BaseTask> {
    try {
      if (!id || !Object.keys(data)?.length) {
        throw new Error('Task id required');
      }
      return await this.model.update(id, data);
    } catch (error) {
      console.error('Error update task:', error);
      throw error;
    }
  }
}
