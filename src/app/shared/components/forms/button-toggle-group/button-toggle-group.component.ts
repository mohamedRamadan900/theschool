import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.scss']
})
export class ButtonToggleGroupComponent {
  @Input() options: { label: string; value: any }[] = [];
  @Input() multiple = false;
  @Input() value: any | any[] = this.multiple ? [] : null;
  @Output() valueChange = new EventEmitter<any>();

  isSelected(option: { value: any }): boolean {
    if (this.multiple) {
      return (this.value as any[]).includes(option.value);
    }
    return this.value === option.value;
  }

  toggleOption(option: { value: any }): void {
    if (this.multiple) {
      const currentValue = this.value as any[];
      const index = currentValue.indexOf(option.value);
      if (index === -1) {
        this.value = [...currentValue, option.value];
      } else {
        this.value = currentValue.filter(v => v !== option.value);
      }
    } else {
      this.value = this.value === option.value ? null : option.value;
    }
    this.valueChange.emit(this.value);
  }
}
