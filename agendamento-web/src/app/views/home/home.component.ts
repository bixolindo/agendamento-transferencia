import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import { HeaderComponent } from "../../components/header/header.component";
import { AgendamentoTransferenciaService } from '../../services/agendamento-transferencia.service';
import { AgendamentoTransferencia } from '../../model/agendamento-transferencia';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderComponent, NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, NgxMaskDirective, ReactiveFormsModule]
})
export class HomeComponent {
  agendamentoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private agendamentoTransferenciaService: AgendamentoTransferenciaService
  ) {
    this.agendamentoForm = this.fb.group({
      contaOrigem: ['', [Validators.required]],
      contaDestino: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      dataT: ['', Validators.required]
    });
  }

  cadastrarAgendamento() {
    if (this.agendamentoForm.valid) {
      const body: AgendamentoTransferencia = {
        contaOrigem: this.agendamentoForm.value.contaOrigem,
        contaDestino: this.agendamentoForm.value.contaDestino,
        valor: this.agendamentoForm.value.valor,
        dataTransferencia: this.agendamentoForm.value.dataT.year + '-' + this.agendamentoForm.value.dataT.month + '-' + this.agendamentoForm.value.dataT.day
      }
      this.agendamentoTransferenciaService.criarTransferencia(body).subscribe(response => {
        console.log('Agendamento cadastrado com sucesso:', response);

        this.agendamentoForm.reset();
        this.agendamentoForm.controls['contaOrigem'].setErrors(null);
        this.agendamentoForm.controls['contaDestino'].setErrors(null);
        this.agendamentoForm.controls['valor'].setErrors(null);
        this.agendamentoForm.controls['dataT'].setErrors(null);
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}