import { Component, input, model, signal, effect, computed } from '@angular/core';
import { Option } from '../../../interfaces/Option';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button-toggle-group',
    templateUrl: './button-toggle-group.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class ButtonToggleGroupComponent {
    label = input<string>('Select Options');
    options = input<Option[]>([]);
    multiple = input<boolean>(false);
    value = model<any>();
    selectedValues = signal<any>(this.multiple() ? [] : null);

    selectedStates = computed(() => {
        const selected = this.selectedValues();
        return this.options().reduce((acc, option) => {
            if (this.multiple()) {
                acc[option.value] = (selected as any[])?.includes(option.value);
            } else {
                acc[option.value] = selected === option.value;
            }
            return acc;
        }, {} as Record<string | number, boolean>);
    });

    constructor() {
        effect(() => {
            if (this.multiple()) {
                this.selectedValues.set([]);
            }
        });
    }

    toggleOption(option: { value: any }): void {
        if (this.multiple()) {
            const currentValue = this.selectedValues() as any[];
            const index = currentValue.indexOf(option.value);
            if (index === -1) {
                this.selectedValues.set([...currentValue, option.value]);
            } else {
                this.selectedValues.set(currentValue.filter((v) => v !== option.value));
            }
        } else {
            this.selectedValues.set(this.selectedValues() === option.value ? null : option.value);
        }
        this.value.set(this.selectedValues());
    }
}
