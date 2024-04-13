import {INote} from "../interfaces/note.interface";

export class NoteModel {
    public readonly id: string;
    public readonly title: string;

    constructor(note: INote) {
        this.id = note.id;
        this.title = note.title;
    }
}
