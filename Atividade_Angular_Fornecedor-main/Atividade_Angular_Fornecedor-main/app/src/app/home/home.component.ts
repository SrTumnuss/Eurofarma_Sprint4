import { Component } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../interfaces/Fornecedor';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  fornecedores: Fornecedor[] = [];
  loginForm: FormGroup = new FormGroup({});
  constructor(private fornecedorService: FornecedorService, private formbuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formbuilder.group({

      usuario: ['', Validators.required],
      senha: ['', Validators.required],

    })

  }

  listar(): void {
    this.fornecedorService.listar().subscribe((listaFornecedores) => (this.fornecedores = listaFornecedores));
  }

  ngOnInit(): void {
    this.listar();
  }


  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



  login() {
    if (this.loginForm.valid) {
      const fornecedorNovo: Fornecedor = {
        usuario: this.loginForm.value.usuario,
        senha: this.loginForm.value.senha
      };
  
     
      this.fornecedorService.listar().subscribe((listaFornecedores) => {
        this.fornecedores = listaFornecedores;
        let usuarioEncontrado = false;
        let senhaCorreta = false;
  
        for (let index = 0; index < this.fornecedores.length; index++) {
          const element = this.fornecedores[index];
  
          if (element.usuario === fornecedorNovo.usuario) {
            usuarioEncontrado = true;
  
            if (element.senha === fornecedorNovo.senha) {
              senhaCorreta = true;
  
              if (fornecedorNovo.usuario.substring(0, 3) === "ADM") {
                this.router.navigate(['/fornecedor']);
              } else if (fornecedorNovo.usuario.substring(0, 3) === "FUN") {
                this.router.navigate(['/nova-rota/'+ element.id]);
              }
  
              break; 
            }
          }
        }
  
        if (!usuarioEncontrado) {
          alert('Nenhum usuário encontrado!');
        } else if (usuarioEncontrado && !senhaCorreta) {
          alert('Senha Incorreta!');
        }
      });
    }
  }

  remover(id: string): void {
    this.fornecedores = this.fornecedores.filter((c) => c.id !== id)
    this.fornecedorService.remover(id).subscribe()
    alert('Fornecedor removido com sucesso!')
  }

}
