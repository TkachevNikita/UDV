import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {InputComponent} from "../UI/input/input.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.scss'],
    standalone: true,
    imports: [
        InputComponent,
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateNoteComponent {
    public noteTitle: FormControl<string | null> = new FormControl<string | null>('');
    @Output()
    public addNote: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    public close: EventEmitter<void> = new EventEmitter<void>();

    public createNote(): void {
        if (this.noteTitle.value) {
            this.addNote.emit(this.noteTitle.value);
        }
    }

    public onClose(): void {
        this.noteTitle.setValue('');
        this.close.emit();
    }
}
