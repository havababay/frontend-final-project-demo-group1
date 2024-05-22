import { Injectable } from '@angular/core';
import { Person } from '../shared/model/person';
import {
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { personConverter } from './converters/person-converter';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private firestore: Firestore) {}

  async list(): Promise<Person[]> {
    const peopleCollection = collection(this.firestore, 'people').withConverter(
      personConverter
    );

    const quertSnapshot : QuerySnapshot<Person | undefined> = await getDocs(
      peopleCollection
    );

    const results: Person[] = [];

    quertSnapshot.docs.forEach((doc: DocumentSnapshot<Person | undefined>) => {
      const data = doc.data();
      if (data) {
        results.push(data);
      }
    });

    return results;
  }

  get(id: string): Person | undefined {
    return new Person('', '', '', '');
  }

  async add(newPersonData: Person) {
    const peopleCollection = collection(this.firestore, 'people').withConverter(
      personConverter
    );
    await addDoc(peopleCollection, newPersonData);
  }

  update(existingPerson: Person): void {}

  delete(existingPersonId: string): void {}
}
