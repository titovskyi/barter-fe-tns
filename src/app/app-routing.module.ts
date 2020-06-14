import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { SingUpComponent } from '~/app/authorization/sing-up/sing-up.component';
import { LoginComponent } from '~/app/authorization/login/login.component';
import { AuthGuardService } from '~/app/authorization/auth-guard.service';
import { ConfirmComponent } from '~/app/authorization/confirm/confirm.component';
import { MainWrapperComponent } from '~/app/main-wrapper/main-wrapper.component';
import {EditUserComponent} from "~/app/edit-user/edit-user.component";

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainWrapperComponent, canActivate: [AuthGuardService] },
    { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuardService] },
    { path: 'sing-up', component: SingUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'confirm', component: ConfirmComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
