import {Injectable} from "@angular/core";
import {INote} from "../interfaces/note.interface";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    /**
     * Получение значений из storage по ключу key
     * @param {string} key
     */
    public getStorage(key: string): INote[] {
        return JSON.parse(localStorage.getItem(key) || JSON.stringify([]));
    }

    /**
     * Создание нового стореджа по ключу key со значением items
     * @param {string} key - ключ
     * @param {INote[]} items - объекты для хранения
     */
    public createNewStorage(key: string, items: INote[]): void {
        localStorage.setItem(key, JSON.stringify(items));
    }

    /**
     * Обновление значения у существующего стореджа по ключу key
     * @param {string} key - ключ
     * @param {INote} item - новый объект
     */
    public updateStorage(key: string, item: INote): void {
        localStorage.setItem(key, JSON.stringify([...this.getStorage(key), item]));
    }
}
