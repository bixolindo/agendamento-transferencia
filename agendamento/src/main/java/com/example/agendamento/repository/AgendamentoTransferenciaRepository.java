package com.example.agendamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.agendamento.model.AgendamentoTransferencia;


@Repository
public interface AgendamentoTransferenciaRepository extends JpaRepository<AgendamentoTransferencia, Long> {
}

