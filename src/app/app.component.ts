import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonComponent} from "./components/UI/button/button.component";
import {InputComponent} from "./components/UI/input/input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NoteModel} from "./models/note.model";
import {NoteComponent} from "./components/note/note.component";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {NoteService} from "./services/note.service";
import {CreateNoteComponent} from "./components/create-note/create-note.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule,
        NoteComponent,
        AsyncPipe,
        CreateNoteComponent
    ],
    providers: [
        NoteService
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public isCreating: boolean = false;

    public notes$!: Observable<NoteModel[]>;

    constructor(private readonly _noteService: NoteService) { }

    public ngOnInit(): void {
        this.notes$ = this._noteService.getNotes;
    }

    public createNote(title: string): void {
        this._noteService.createNote({
            id: crypto.randomUUID(),
            title: title
        });
        this.isCreating = false;
    }

    public removeNote(id: string): void {
        this._noteService.removeNote(id);
    }

    public onCreateClick(): void {
        this.isCreating = true;
    }

    public onCloseCreateClick(): void {
        this.isCreating = false;
    }
}
