package com.example.agendamento.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.agendamento.model.LoginDTO;
import com.example.agendamento.model.Usuario;
import com.example.agendamento.security.TokenService;

@RestController
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	TokenService tokenService;

	@PostMapping("/login")
	public ResponseEntity<LoginDTO> login(@RequestBody Usuario user) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				user.getNome(), user.getSenha());
		logger.info("Attempting to authenticate user: " + user.getNome());
		try {
			Authentication authenticate = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
			Usuario usuario = (Usuario) authenticate.getPrincipal();
			String token = tokenService.gerarToken(usuario);

			return ResponseEntity.ok(new LoginDTO(usuario.getNome(), token));
		} catch (Exception e) {
			logger.error("Authentication failed", e);
		}
		return null;

	}

}
