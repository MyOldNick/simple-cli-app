export type Freq = 'daily' | 'weekly' | 'monthly';

export interface BaseTask {
  id: number;
  createdAt: string;
  completed: Record<string, boolean>;
  name: string;
  freq: Freq;
}

export interface CreateTask extends Pick<BaseTask, 'name' | 'freq'> {}
