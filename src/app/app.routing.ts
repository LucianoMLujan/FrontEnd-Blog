import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

//Servicios
import { IdentityGuards } from './services/identity.guard';

//Definir rutas
const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'inicio', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuards]},
	{path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuards]},
	{path: 'crear-post', component: PostNewComponent, canActivate: [IdentityGuards]},
	{path: 'post/:id', component: PostDetailComponent},
	{path: 'editar-post/:id', component: PostEditComponent, canActivate: [IdentityGuards]},
	{path: 'categoria/:id', component: CategoryDetailComponent},
	{path: 'perfil/:id', component: ProfileComponent},
	{path: '**', component: ErrorComponent}	
];

//Exportar configuración
export const appRoutingProviders: any = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);