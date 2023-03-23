"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('Домашка');
const BACKEND_URL = 'https://intership-liga.ru';
class BasicAgent {
    constructor(_backendUrl) {
        this._backendUrl = _backendUrl;
        this.fetch = (url, config) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._backendUrl}${url}`, config);
            if (!res.ok) {
                throw new Error(`Ошибка:( Статус: ${res.status}`);
            }
            else {
                const data = (yield res.json());
                return data;
            }
        });
    }
}
class taskAgent extends BasicAgent {
    constructor() {
        super(BACKEND_URL);
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch('/tasks');
                console.log('Все задачи:', res);
                return res;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        });
        this.getOneTask = (taskId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks/${taskId}`);
                console.log('Задача:', res);
                return res;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        });
        this.addTask = (task) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
                console.log('Задача добавлена:', res);
                return res;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        });
        this.patchTask = (taskId, task) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks/${taskId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
                console.log('Задача обновлена:', res);
                return res;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        });
        this.deleteOneTask = (taskId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.fetch(`/tasks/${taskId}`, {
                    method: 'DELETE',
                });
                console.log('Задача удалена');
                console.log(res);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
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
const taskget = new taskAgent();
taskget.getTasks();
taskget.getOneTask(29);
taskget.addTask(task);
taskget.patchTask(26, taskPatch);
taskget.deleteOneTask(32);
//# sourceMappingURL=index.js.map