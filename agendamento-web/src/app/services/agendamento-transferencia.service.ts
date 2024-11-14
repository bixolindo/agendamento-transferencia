import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgendamentoTransferencia } from '../model/agendamento-transferencia';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AgendamentoTransferenciaService {

    private apiUrl = `${environment.apiBaseUrl}/transferencias`; 
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    criarTransferencia(transferencia: AgendamentoTransferencia): Observable<AgendamentoTransferencia> {
        return this.http.post<AgendamentoTransferencia>(this.apiUrl, transferencia, this.httpOptions);
    }

    listarTransferencias(): Observable<AgendamentoTransferencia[]> {
        return this.http.get<AgendamentoTransferencia[]>(this.apiUrl);
    }

    buscarTransferencia(id: number): Observable<AgendamentoTransferencia> {
        return this.http.get<AgendamentoTransferencia>(`${this.apiUrl}/${id}`);
    }

    atualizarTransferencia(id: number, transferencia: AgendamentoTransferencia): Observable<AgendamentoTransferencia> {
        return this.http.put<AgendamentoTransferencia>(`${this.apiUrl}/${id}`, transferencia, this.httpOptions);
    }

    deletarTransferencia(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
