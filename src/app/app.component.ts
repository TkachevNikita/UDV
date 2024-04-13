import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonComponent} from "./components/UI/button/button.component";
import {InputComponent} from "./components/UI/input/input.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NoteModel} from "./models/note.model";
import {NoteComponent} from "./components/note/note.component";

export const Notes: NoteModel[] = [
    new NoteModel({
        id: crypto.randomUUID(),
        title: 'Заметка 1'
    }),
    new NoteModel({
        id: crypto.randomUUID(),
        title: 'Заметка 2'
    }),
    new NoteModel({
        id: crypto.randomUUID(),
        title: 'Заметка 3'
    })
]

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        RouterOutlet,
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule,
        NoteComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    public text = new FormControl<string>('');

    test(): void {
        console.log(this.text);
    }

    protected readonly Notes = Notes;
}
