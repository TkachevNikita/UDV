import {Injectable} from "@angular/core";
import {NoteModel} from "../models/note.model";
import {map, Observable, of} from "rxjs";
import {INote} from "../interfaces/note.interface";

@Injectable()
export class NoteService {

    public getNotes(): Observable<NoteModel[]> {
        return this.requestNotes()
            .pipe(
                map((notes: INote[]) => notes.map((note: INote) => new NoteModel(note)))
            );
    }

    private requestNotes(): Observable<INote[]> {
        return of(JSON.parse(localStorage.getItem('notes')!) || []);
    }
}
