import { DocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { Person } from '../../shared/model/person';
import { PhoneNumber } from '../../shared/model/phone-number';

export const personConverter = {
  toFirestore: (person: Person) => {
    const simplePhones = [];

    for(let i=0;i < person.phones.length; ++i) {
        simplePhones.push(
            {
                number : person.phones[i].number,
                type : person.phones[i].type
            }
        );
    }

    return {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      age: person.age,
      phone: simplePhones
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    
    if (!data) return undefined;

    const simplePhones = data['phone'];
    const phones : PhoneNumber[] = [];

    for(let i=0;i < simplePhones.length; ++i) {
        phones.push(
            new PhoneNumber(simplePhones[i]['number'],
            simplePhones[i]['type']
        ));
    }

    const newPerson = new Person(
        snapshot.id,
        data['firstName'],
        data['lastName'],
        data['email'],
        data['age']
      );

      newPerson.phones = phones;

    return newPerson;
  },
};
