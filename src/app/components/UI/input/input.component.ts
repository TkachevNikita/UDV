import {ChangeDetectionStrategy, Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    @Input()
    public placeholder?: string;

    public value!: string;

    private _onTouched: () => void = () => {};
    private _onChange: (value: string) => void = () => {};

    public registerOnChange(fn: (value: string) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public writeValue(value: string): void {
        this.value = value;
    }

    public onChange(event: Event) {
        const newValue = (event.target as HTMLInputElement).value;
        this._onChange(newValue);
        this._onTouched();
    }
}
