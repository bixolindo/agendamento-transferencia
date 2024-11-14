export interface AgendamentoTransferencia {
    contaOrigem: string;
    contaDestino: string;
    valor: number;
    taxa?: number;
    dataTransferencia?: string;
    diasTransferencia?: number;
}