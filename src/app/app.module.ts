import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptMaterialBottomSheetModule } from 'nativescript-material-bottomsheet/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingUpComponent } from './authorization/sing-up/sing-up.component';
import { LoginComponent } from './authorization/login/login.component';
import { ConfirmComponent } from './authorization/confirm/confirm.component';
import { JwtInterceptor } from '~/app/helpers/jwt.interceptor';
import { AddPostComponent } from './modals/add-post/add-post.component';
import { SearchComponent } from './main-wrapper/search/search.component';
import { HomeComponent } from './main-wrapper/home/home.component';
import { ChatComponent } from './main-wrapper/chat/chat.component';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';
import { UserProfileComponent } from './main-wrapper/user-profile/user-profile.component';
import { AllUserPostsComponent } from './main-wrapper/user-profile/all-posts-view/all-user-posts.component';
import { PostsStripComponent } from './main-wrapper/user-profile/posts-strip/posts-strip.component';

import { BottomSheetComponent } from './shared/bottom-sheet/bottom-sheet.component';

import { TNSFrescoModule } from 'nativescript-fresco/angular';
import * as frescoModule from 'nativescript-fresco';
import * as applicationModule from 'tns-core-modules/application';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailedPostComponent } from './modals/detailed-post/detailed-post.component';
import { PropositionComponent } from './proposition/proposition.component';

if (applicationModule.android) {
    applicationModule.on('launch', () => {
        frescoModule.initialize();
    });
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptMaterialBottomSheetModule.forRoot(),
        TNSFrescoModule
    ],
    declarations: [
        AppComponent,
        SingUpComponent,
        LoginComponent,
        UserProfileComponent,
        ConfirmComponent,
        AddPostComponent,
        SearchComponent,
        HomeComponent,
        ChatComponent,
        MainWrapperComponent,
        AllUserPostsComponent,
        PostsStripComponent,
        BottomSheetComponent,
        EditUserComponent,
        DetailedPostComponent,
        PropositionComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    entryComponents: [BottomSheetComponent, AddPostComponent, DetailedPostComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
