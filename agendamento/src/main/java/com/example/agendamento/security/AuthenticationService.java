package com.example.agendamento.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.agendamento.model.Usuario;
import com.example.agendamento.repository.UsuarioRepository;

@Service
public class AuthenticationService implements UserDetailsService {
	

	@Autowired
	UsuarioRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Usuario usuario = repository.findByNome(username);
		if (usuario == null) {
			new UsernameNotFoundException("Usuário não encontrado: " + username);
		}

        return usuario;
	}

}
