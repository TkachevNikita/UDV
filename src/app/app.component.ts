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

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule,
        NoteComponent,
        AsyncPipe
    ],
    providers: [
        NoteService
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public notes$!: Observable<NoteModel[]>;

    constructor(private readonly _noteService: NoteService) { }

    public ngOnInit(): void {
        this.notes$ = this._noteService.getNotes();
    }
}
