import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'qreader',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
    },
    {
        path: 'qreader',
        loadChildren: () => import('./pages/qreader/qreader.module').then(m => m.QreaderPageModule)
    },
    {
        path: 'message',
        loadChildren: () => import('./pages/message/message.module').then(m => m.MessagePageModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
    },
    {
        path: 'logout',
        loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule)
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
    },
    {
        path: 'diseases',
        loadChildren: () => import('./pages/diseases/diseases.module').then(m => m.DiseasesPageModule)
    },
    {
        path: 'termsyc',
        loadChildren: () => import('./pages/termsyc/termsyc.module').then(m => m.TermsycPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
