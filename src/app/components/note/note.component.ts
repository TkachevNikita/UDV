import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {NoteModel} from "../../models/note.model";
import {InputComponent} from "../UI/input/input.component";

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        InputComponent
    ],
    standalone: true
})
export class NoteComponent {
    @Input({
        required: true
    })
    public note!: NoteModel;

}
