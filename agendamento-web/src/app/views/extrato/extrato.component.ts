import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AgendamentoTransferenciaService } from '../../services/agendamento-transferencia.service';
import { AgendamentoTransferencia } from '../../model/agendamento-transferencia';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.scss'
})
export class ExtratoComponent implements OnInit {

  transferencias: AgendamentoTransferencia[] = []; // Array para armazenar as transferências

  constructor(private agendamentoService: AgendamentoTransferenciaService) { }
  ngOnInit(): void {
    this.buscarDados();
  }


  buscarDados(): void {
    this.agendamentoService.listarTransferencias()
      .pipe(map(dados => dados.map(d => {
        return {
          ...d,
          diasTransferencia: this.calcularDiasParaTransferencia(d.dataTransferencia!)
        }
      })))
      .subscribe({
        next: (transferencias) => {
          this.transferencias = transferencias;
        },
        error: (error) => {
          // Tratar o erro caso ocorra
          console.error('Erro ao buscar transferências:', error);
        }
      });
  }


  calcularDiasParaTransferencia(dataTransferencia: string): number {
    // Implementar a lógica para calcular os dias para transferência
    // Exemplo:
    const dataAtual = new Date();
    const data = new Date(dataTransferencia);
    const dias = Math.abs(data.getTime() - dataAtual.getTime()) / (1000 * 3600 * 24);
    return Math.floor(dias);
  }

}
