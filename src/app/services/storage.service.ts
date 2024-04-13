import {Injectable} from "@angular/core";
import {INote} from "../interfaces/note.interface";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public getStorage(key: string): INote[] {
        return JSON.parse(localStorage.getItem(key) || JSON.stringify([]));
    }

    public createNewStorage(key: string, item: INote): void {
        localStorage.setItem(key, JSON.stringify([item]));
    }

    public updateStorage(key: string, item: INote): void {
        localStorage.setItem(key, JSON.stringify([...this.getStorage(key), item]));
    }
}
