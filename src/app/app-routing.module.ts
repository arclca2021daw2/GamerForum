import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { AuthGuard } from './guards/auth.guard';
import { JocComponent } from './components/joc/joc.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { RegistreComponent } from './components/registre/registre.component';
import { ResetPasswdComponent } from './components/reset-passwd/reset-passwd.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuariComponent } from './components/usuari/usuari.component';

const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent,  canActivate: [AuthGuard]},
  {path: 'adminJocs', component: AdministrarComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'joc/:nom', component: JocComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registre', component: RegistreComponent},
  {path: 'reset-passwd', component: ResetPasswdComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'usuari/:correu', component: UsuariComponent, canActivate: [AuthGuard]},

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
