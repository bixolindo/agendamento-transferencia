import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective } from 'ngx-mask';
import { HeaderComponent } from "../../components/header/header.component";
import { AgendamentoTransferenciaService } from '../../services/agendamento-transferencia.service';
import { AgendamentoTransferencia } from '../../model/agendamento-transferencia';
import { ToastComponent } from "../../components/toast/toast.component";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderComponent, NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, NgxMaskDirective, ReactiveFormsModule, ToastComponent]
})
export class HomeComponent {
  agendamentoForm: FormGroup;
  toastMessage: string = '';
  toastType: string = 'success';
  isToastVisible: boolean = false;

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
        dataTransferencia: this.agendamentoForm.value.dataT.year + '-' + this.agendamentoForm.value.dataT.month + '-' + (this.agendamentoForm.value.dataT.day < 10 ? ("0" + this.agendamentoForm.value.dataT.day) : this.agendamentoForm.value.dataT.day)
      }
      this.agendamentoTransferenciaService.criarTransferencia(body).subscribe({
        next: (_) => {
          this.showToast('Agendamento cadastrado com sucesso:', 'success');
          this.agendamentoForm.reset();
          this.agendamentoForm.controls['contaOrigem'].setErrors(null);
          this.agendamentoForm.controls['contaDestino'].setErrors(null);
          this.agendamentoForm.controls['valor'].setErrors(null);
          this.agendamentoForm.controls['dataT'].setErrors(null);
        },
        error: (err) => {
          this.showToast(err.error, 'danger');
        }
      });
    } else {
      this.showToast('Formulário inválido', 'warning');
    }
  }

  showToast(message: string, type: string) {
    this.toastMessage = message;
    this.toastType = type;
    this.isToastVisible = true;

    setTimeout(() => {
      this.isToastVisible = false;
    }, 3000);
  }


}