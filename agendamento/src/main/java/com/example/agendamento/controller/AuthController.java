package com.example.agendamento.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	public String login(@RequestBody Usuario user) {
		logger.info("1");

		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				user.getNome(), user.getSenha());
		logger.info("2");

		logger.info("Attempting to authenticate user: " + user.getNome());
		try {
		    Authentication authenticate = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
		    logger.info("Autenticação realizada");
		    
			Usuario usuario = (Usuario) authenticate.getPrincipal();
			logger.info("4");

			return tokenService.gerarToken(usuario);
		} catch (Exception e) {
		    logger.error("Authentication failed", e);
		}
		return null;

	

	}

}
