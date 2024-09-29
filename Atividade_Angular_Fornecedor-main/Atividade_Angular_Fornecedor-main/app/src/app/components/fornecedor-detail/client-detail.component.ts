import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../interfaces/Fornecedor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedor-detail.component.html',
  styleUrl: './fornecedor-detail.component.css'
})
export class FornecedorDetailComponent {
  fornecedor?:Fornecedor;
  fornecedorForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private fornecedorService: FornecedorService, private formbuilder: FormBuilder){

    this.getClientById()

  }
  id?:string;
  getClientById(){

    this.id = this.route.snapshot.paramMap.get('id')??'';
    
    this.fornecedorService.getById(this.id).subscribe((fornecedorResponse) => (this.fornecedor =  fornecedorResponse))
    this.fornecedorForm = this.formbuilder.group({

      nome:[this.fornecedor?.nome],
      usuario:[this.fornecedor?.usuario],
      senha:[this.fornecedor?.senha],
      cargo:[this.fornecedor?.cargo],
      video:[this.fornecedor?.video],
      id:[this.fornecedor?.id],
      nomeDoCurso: [this.fornecedor?.nomeDoCurso]

 
    })

  }

  update():void{
    if(this.fornecedorForm.valid){
      const fornecedorNovo:Fornecedor = {
        nome: this.fornecedorForm.value.nome,
        usuario: this.fornecedorForm.value.usuario,
        senha:this.fornecedorForm.value.senha,
        cargo:this.fornecedorForm.value.cargo,
        video:this.fornecedorForm.value.video,
        id: this.fornecedorForm.value.id,
        nomeDoCurso: this.fornecedorForm.value.nomeDoCurso
      }
      this.fornecedorService.atualizar(fornecedorNovo).subscribe()
      alert('Funcionario alterado com sucesso!')


    }
  }

}
