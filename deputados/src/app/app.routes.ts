import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { BuscaComponent } from './busca/busca';
import { PaginaNaoEncontrada } from './pagina-nao-encontrada/pagina-nao-encontrada';

export const routes: Routes = [
    {path: 'inicio', component: Inicio},
    {path: 'busca', component: BuscaComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: '**', component: PaginaNaoEncontrada} 
];
