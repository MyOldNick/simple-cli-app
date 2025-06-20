import { Service } from '../services/service';
import { Freq } from '../shared/types/types';

export class Controller {
  constructor(private readonly service: Service) {}

  async addNewTask(args: Array<string>): Promise<void> {
    const [argName, argFreq] = args?.splice(0, 2) as [string, Freq];
    const name = argName.split('=')[1];
    const freq = argFreq.split('=')[1] as Freq;
    const task = await this.service.addNewTask({ name, freq });
    console.table(task);
  }

  async getTasks(): Promise<void> {
    const data = await this.service.getTasks();
    console.table(data);
  }

  async doneTask(args: Array<string>): Promise<void> {
    const [argId] = args;
    const id = argId.split('=')[1];
    const result = await this.service.doneTask(Number(id));
    console.table(result);
  }

  async showStats(args: Array<string>): Promise<void> {
    const [argId] = args;
    const id = argId.split('=')[1];
    const result = await this.service.showStats(Number(id));
    console.table(result);
  }

  async deleteTask(args: Array<string>): Promise<void> {
    const [argId] = args;
    const id = argId.split('=')[1];
    const result = await this.service.deleteTask(Number(id));
    console.log(result);
  }

  async updateTask(args: Array<string>): Promise<void> {
    const [argId, argName, argFreq] = args;
    const id = argId.split('=')[1];
    const name = argName?.split('=')[1];
    const freq = argFreq?.split('=')[1] as Freq;
    const data: { name?: string; freq?: Freq } = {};
    if (name) data.name = name;
    if (freq) data.freq = freq;
    const result = await this.service.updateTask(Number(id), data);
    console.table(result);
  }
}
