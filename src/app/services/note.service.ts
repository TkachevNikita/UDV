import {DestroyRef, inject, Injectable} from "@angular/core";
import {NoteModel} from "../models/note.model";
import {BehaviorSubject, map, Observable, take} from "rxjs";
import {INote} from "../interfaces/note.interface";
import {StorageService} from "./storage.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable()
export class NoteService {
    private _destroyRef: DestroyRef = inject(DestroyRef);
    private notes$: BehaviorSubject<NoteModel[]> = new BehaviorSubject<NoteModel[]>([]);

    constructor(private readonly _storageService: StorageService) {
        this.loadNotes();
    }

    /**
     * Получение всех заметок
     * @return {Observable<NoteModel[]>} список заметок
     */
    public get getNotes(): Observable<NoteModel[]> {
        return this.notes$.asObservable();
    }

    /**
     * Загрузка заметок
     */
    private loadNotes(): void {
        this.notes$.next(
            (this._storageService.getStorage('notes') || [])
                .map((note: INote) => new NoteModel(note))
            );
    }

    /**
     * Создание новой заметки
     * @param {INote} note - новая заметка
     */
    public createNote(note: INote): void {
        this._storageService.getStorage('notes') ? this._storageService.updateStorage('notes', note) : this._storageService.createNewStorage('notes', [note]);
        this.notes$.next(this._storageService.getStorage('notes'));
    }

    /**
     * Удаление заметки
     * @param {string} id - идентификатор удаляемой заметки
     */
    public removeNote(id: string): void {
        this.notes$
            .pipe(
                take(1),
                takeUntilDestroyed(this._destroyRef),
                map((notes: NoteModel[]) => notes.filter((note: NoteModel) => note.id !== id))
            )
            .subscribe((notes: NoteModel[]) => {
                this._storageService.createNewStorage('notes', notes);
                this.notes$.next(notes);
            });
    }
}
