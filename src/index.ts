console.log('Домашка');
const BACKEND_URL = 'https://intership-liga.ru';

interface Task {
  id: number;
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}

class BasicAgent {
  constructor(private _backendUrl: string) {}

  fetch = async <T>(url: string, config?: RequestInit): Promise<T> | never => {
    const res = await fetch(`${this._backendUrl}${url}`, config);
    if (!res.ok) {
      throw new Error(`Ошибка:( Статус: ${res.status}`);
    } else {
      const data = (await res.json()) as T;
      return data;
    }
  };
}

class taskAgent extends BasicAgent {
  constructor() {
    super(BACKEND_URL);
  }
  getTasks = async (): Promise<Task[]> => {
    try {
      const res = await this.fetch<Task[]>('/tasks');
      console.log('Все задачи:', res);

      return res;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  getOneTask = async (taskId: number): Promise<Task> => {
    try {
      const res = await this.fetch<Task>(`/tasks/${taskId}`);
      console.log('Задача:', res);

      return res;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  addTask = async (task: Omit<Task, 'id' | 'isCompleted'>): Promise<Task> => {
    try {
      const res = await this.fetch<Task>(`/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      console.log('Задача добавлена:', res);

      return res;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  patchTask = async (taskId: number, task: Partial<Omit<Task, 'id'>>): Promise<Task> => {
    try {
      const res = await this.fetch<Task>(`/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      console.log('Задача обновлена:', res);
      return res;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  deleteOneTask = async (taskId: number): Promise<void> => {
    try {
      const res = await this.fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
      });
      console.log('Задача удалена');

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
}

const task = {
  name: 'kill',
  info: '333rrr',
  isImportant: false,
};

const taskPatch = {
  name: '3rrr3344',
  info: '666',
  isImportant: false,
  isCompleted: true,
};

const todo = new taskAgent();
todo.getTasks();
todo.getOneTask(29);
todo.addTask(task);
todo.patchTask(26, taskPatch);
todo.deleteOneTask(32);
