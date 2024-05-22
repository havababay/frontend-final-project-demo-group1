import { PersonsService } from './../services/persons.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Person } from '../shared/model/person';
import { MatButtonModule } from '@angular/material/button';
import { PersonCardComponent } from '../person-card/person-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-random-team-progress',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PersonCardComponent, MatIconModule, MatProgressBarModule],
  templateUrl: './random-team-progress.component.html',
  styleUrl: './random-team-progress.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomTeamProgressComponent implements OnInit {
  allPersons: Person[] = [];
  randomPersons: Person[] = [];
  currentPersonIndex = 0;

  constructor(private personsService: PersonsService) {}

  ngOnInit(): void {
    this.personsService.list().then(
      (result : Person[]) => this.allPersons = result 
    );
    
  }

  generateRandomTeam() {
    this.randomPersons = [...this.allPersons].sort(() => Math.random() - 0.5);

    this.randomPersons = this.randomPersons.splice(0, 3);
    this.currentPersonIndex = 0;
  }

  nextPerson() {
    ++this.currentPersonIndex;
  }

  getProgressValue() : number {
    return ((this.currentPersonIndex + 1) / this.randomPersons.length) * 100;
  }
}
