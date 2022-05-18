import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UserDetails } from '../model/user-details';
import { AuthenticationService } from '../services/authentication.service';
import { NetworkService } from '../services/reseau.service';
import { UserService } from '../services/utilisateur.service';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.scss'],
})
export class ReseauComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
