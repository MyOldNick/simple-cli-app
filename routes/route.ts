import { Controller } from '../controllers/controller';

type Routes = {
  [key: string]: (args: Array<string>) => void;
};

export class Router {
  constructor(
    private readonly args: Array<string>,
    private readonly controller: Controller,
  ) {
    this.initRoutes();
  }

  private readonly routes: Routes = {
    add: (args: Array<string>) => this.addTask(args),
    list: () => this.showTasks(),
    done: (args: Array<string>) => this.doneTask(args),
    stats: (args: Array<string>) => this.showStats(args),
    delete: (args: Array<string>) => this.deleteTask(args),
    update: (args: Array<string>) => this.updateTask(args),
  };

  private initRoutes(): void {
    const mainCommand = this.args[0] as keyof Routes;
    this.routes[mainCommand](this.args.slice(1));
  }

  private addTask(args: Array<string>): void {
    this.controller.addNewTask(args);
  }

  private showTasks(): void {
    this.controller.getTasks();
  }

  private doneTask(args: Array<string>): void {
    this.controller.doneTask(args);
  }

  private showStats(args: Array<string>): void {
    this.controller.showStats(args);
  }

  private deleteTask(args: Array<string>): void {
    this.controller.deleteTask(args);
  }

  private updateTask(args: Array<string>): void {
    this.controller.updateTask(args);
  }
}
