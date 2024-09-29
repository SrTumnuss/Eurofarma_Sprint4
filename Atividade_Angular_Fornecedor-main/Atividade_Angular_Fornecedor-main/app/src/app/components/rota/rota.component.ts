import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../interfaces/Fornecedor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rota',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {
  fornecedor: Fornecedor | undefined;
  id?: string;

  constructor(
    private route: ActivatedRoute, 
    private fornecedorService: FornecedorService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('ID do fornecedor:', this.id);
    this.getFornecedor();
  }

  getFornecedor(): void {
    if (this.id) {
      this.fornecedorService.getById(this.id).subscribe(
        (fornecedor) => {
          this.fornecedor = fornecedor;
          console.log('Dados do fornecedor:', this.fornecedor);
        },
        (error) => {
          console.error('Erro ao buscar fornecedor:', error);
        }
      );
    } else {
      console.error('ID não encontrado.');
    }
  }

  sanitizarUrl(videoUrl?: string): SafeResourceUrl {
    if (!videoUrl) {
     
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
