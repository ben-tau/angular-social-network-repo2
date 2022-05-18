import { Component, Input, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { UserService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class WallAsideComponent implements OnInit {
  @Input() userDetails!: any;
  userInfos: any = [];
  networkInfos: any = [];

<<<<<<< HEAD
  constructor(
    private utilisateurService: UserService,
    private connectionService: ConnectionService
  ) {}
=======
  @Input() userDetails!:any
  userInfos:any = []
  networkInfos:any = []

  constructor(private utilisateurService:UserService,private connectionService :ConnectionService) { }
>>>>>>> 93a5a910af75f073332b8498bee00c90b492c66b

  ngOnInit(): void {
    this.getUser();
    this.getNetwork();
  }

  getUser() {
    this.utilisateurService
      .getUser(+this.userDetails.id)
      .subscribe((userInfos) => {
        //fake data
        userInfos.name = 'Taupiac';
        userInfos.firstname = 'Benjamin';
        userInfos.description =
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut eius quidem exercitationem velit recusandae totam voluptate voluptatem accusantium dolorum. Explicabo dolor repudiandae quis placeat iusto a atque, adipisci deleniti aspernatur!';
        userInfos.actualJob = 'Web Dev';
        // end fake data

        this.userInfos = userInfos;
      });
  }
  getNetwork() {
    this.connectionService
      .getConnections(+this.userDetails.id, this.userDetails.token)
      .subscribe((networkInfos) => {
        this.networkInfos = networkInfos;
      });
  }
}
