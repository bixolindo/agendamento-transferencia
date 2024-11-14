package com.example.agendamento.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.agendamento.exeptions.TaxaException;
import com.example.agendamento.model.AgendamentoTransferencia;
import com.example.agendamento.repository.AgendamentoTransferenciaRepository;

@RestController
@RequestMapping("/transferencias")

public class AgendamentoTransferenciaController {

	@Autowired
	private AgendamentoTransferenciaRepository transferenciaRepository;

	@PostMapping
	public ResponseEntity criarTransferencia(@RequestBody AgendamentoTransferencia transferencia) {
		try {
			if (transferencia.getDataAgendamento() == null) {
				transferencia.setDataAgendamento(LocalDate.now());
			}
			BigDecimal taxa = calcularTaxa(transferencia.getValor(), transferencia.getDataAgendamento(),
					transferencia.getDataTransferencia());
			transferencia.setTaxa(taxa);

			AgendamentoTransferencia novaTransferencia = transferenciaRepository.save(transferencia);
			return new ResponseEntity<>(novaTransferencia, HttpStatus.CREATED);
		} catch (TaxaException e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping
	public List<AgendamentoTransferencia> listarTransferencias() {
		return transferenciaRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<AgendamentoTransferencia> buscarTransferencia(@PathVariable Long id) {
		Optional<AgendamentoTransferencia> transferencia = transferenciaRepository.findById(id);

		if (transferencia.isPresent()) {
			return new ResponseEntity<>(transferencia.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<AgendamentoTransferencia> atualizarTransferencia(@PathVariable Long id,
			@RequestBody AgendamentoTransferencia transferencia) {

		if (!transferenciaRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		transferencia.setId(id);
		AgendamentoTransferencia transferenciaAtualizada = transferenciaRepository.save(transferencia);
		return new ResponseEntity<>(transferenciaAtualizada, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletarTransferencia(@PathVariable Long id) {
		if (!transferenciaRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		transferenciaRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	private BigDecimal calcularTaxa(BigDecimal valor, LocalDate dataAgendamento, LocalDate dataTransferencia)
			throws TaxaException {
		long diasEntre = java.time.temporal.ChronoUnit.DAYS.between(dataAgendamento, dataTransferencia);
		if (diasEntre == 0) {
			return valor.multiply(BigDecimal.valueOf(0.025)).add(BigDecimal.valueOf(3));
		} else if (diasEntre >= 1 && diasEntre <= 10) {
			return BigDecimal.valueOf(12);
		} else if (diasEntre >= 11 && diasEntre <= 20) {
			return valor.multiply(BigDecimal.valueOf(0.082));
		} else if (diasEntre >= 21 && diasEntre <= 30) {
			return valor.multiply(BigDecimal.valueOf(0.069));
		} else if (diasEntre >= 31 && diasEntre <= 40) {
			return valor.multiply(BigDecimal.valueOf(0.047));
		} else if (diasEntre >= 41 && diasEntre <= 50) {
			return valor.multiply(BigDecimal.valueOf(0.017));
		} else {
			throw new TaxaException("Não ha taxa valida, por favor revise as informações da sua transferência");
		}
	}
}
