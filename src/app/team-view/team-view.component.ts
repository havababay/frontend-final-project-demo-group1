import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PersonsService } from '../services/persons.service';
import { Person } from '../shared/model/person';
import { PersonCardComponent } from '../person-card/person-card.component';

@Component({
  selector: 'app-team-view',
  standalone: true,
  imports: [
    CommonModule, PersonCardComponent
  ],
  templateUrl: './team-view.component.html',
  styleUrl: './team-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamViewComponent implements OnInit { 
  allPersons : Person[] = [];

  constructor(private personService : PersonsService){}

  ngOnInit(): void {
    this.personService.list().then(
      (result : Person[]) => this.allPersons = result
    );
  }
}