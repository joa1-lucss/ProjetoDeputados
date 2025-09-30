import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeputadoService } from '../model/deputado-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.html',
  styleUrls: ['./busca.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class BuscaComponent {
  deputadoForm: FormGroup;
  deputados: any[] = [];
  carregando: boolean = false;
  mensagemErro: string = '';
  erro: boolean = false;

  constructor(
    private fb: FormBuilder,
    private deputadoService: DeputadoService
  ) {
    this.deputadoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  buscar() {
    this.deputadoForm.markAllAsTouched();
    if (this.deputadoForm.invalid) return;

    this.carregando = true;
    const nome = this.deputadoForm.value.nome;

    this.deputadoService.buscarDeputadosPorNome(nome).subscribe({
      next: (res: any) => { 
        this.deputados = res?.dados ?? [];
        this.carregando = false;
        if (res?.dados?.length === 0) {
          this.mensagemErro = 'Nenhum deputado encontrado. Tente outro nome.';
          this.erro=true
        }
      },
      error: (err: any) => {
        console.error(err);
        this.carregando = false;
        this.erro=true
      }
    });
  }
}