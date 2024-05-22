import { HouseholdTasksService } from './../services/household-tasks.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HouseholdTask } from '../shared/model/household-task';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TaskDuration } from '../shared/model/task-duration';
import { PersonsService } from '../services/persons.service';
import { Person } from '../shared/model/person';
import { PersonCardComponent } from '../person-card/person-card.component';

@Component({
  selector: 'app-household-task-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    PersonCardComponent,
  ],
  templateUrl: './household-task-assignment.component.html',
  styleUrl: './household-task-assignment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseholdTaskAssignmentComponent implements OnInit {
  allTasks: HouseholdTask[] = [];
  allPersons: Person[] = [];
  randomTeam: Person[] = [];

  readonly PERSONS_PER_TASK = 2;
  selectedTask?: HouseholdTask;

  constructor(
    private householdTasksService: HouseholdTasksService,
    private personService: PersonsService
  ) {}
  ngOnInit(): void {
    this.allTasks = this.householdTasksService.list();
    this.personService.list().then(
      (result : Person[]) =>
        this.allPersons = result
    );
  }

  getDurationStyle(): string {
    if (!this.selectedTask) {
      return '';
    }

    switch (this.selectedTask.duration) {
      case TaskDuration.SHORT:
        return 'task-short';
      case TaskDuration.MEDIUM:
        return 'task-medium';
      default:
        return 'task-long';
    }
  }

  chooseRandomTeam() {
    this.randomTeam = [...this.allPersons];
    this.randomTeam.sort(() => Math.random() - 0.5);
    this.randomTeam = this.randomTeam.splice(0, 2);
  }
}
