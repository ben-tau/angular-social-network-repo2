import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NetworkComponent } from './network/network.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupComponent } from './signup/signup.component';
import { SuspendedComponent } from './suspended/suspended.component';
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'suspended',
    component: SuspendedComponent,
  },
  {
    path: 'feed',
    component: WallComponent,
    canActivate: [AuthGuard],
  },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'network', component: NetworkComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'feed',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
