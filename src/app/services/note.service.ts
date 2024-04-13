import {Injectable} from "@angular/core";
import {NoteModel} from "../models/note.model";
import {map, Observable, of} from "rxjs";
import {INote} from "../interfaces/note.interface";
import {StorageService} from "./storage.service";

@Injectable()
export class NoteService {

    constructor(private readonly _storageService: StorageService) { }

    public getNotes(): Observable<NoteModel[]> {
        return this.requestNotes()
            .pipe(
                map((notes: INote[]) => notes.map((note: INote) => new NoteModel(note)))
            );
    }

    private requestNotes(): Observable<INote[]> {
        return of(JSON.parse(localStorage.getItem('notes')!) || []);
    }

    public createNote(note: INote): void {
        this._storageService.getStorage('key')
            ? this._storageService.updateStorage('key', note) : this._storageService.createNewStorage('key', note);
    }
}
