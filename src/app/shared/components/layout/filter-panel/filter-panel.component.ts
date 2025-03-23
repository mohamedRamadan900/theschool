import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { SelectDropdownComponent } from "../../forms/select-dropdown/select-dropdown.component";

@Component({
  selector: 'app-filter-panel',
  imports: [CardComponent, SelectDropdownComponent],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent {

}
