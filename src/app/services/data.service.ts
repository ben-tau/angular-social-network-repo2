import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    let posts =  [
        {
          id:1,
          version:2,
          contenu:'lorem ipsum sin dolor cdfqsddfqsdqsdqd',
          datePublication: '10-03-2021',
          visibilite:true,
          likes:55,
          utilisateurId:654
        },
        {
          id:2,
          version:3,
          contenu:'lorem ipsum sin dolor qsdqsdqsdqdqsd ',
          datePublication: '11-12-2021',
          visibilite:true,
          likes:3,
          utilisateurId:85
        },
        {
          id:3,
          version:1,
          contenu:'lorem ipsum sin dolor qsdqsdqsdqsdq',
          datePublication: '08-07-2021',
          visibilite:false,
          likes:150,
          utilisateurId:52
        }
      ]

    return {posts};
  }
}
