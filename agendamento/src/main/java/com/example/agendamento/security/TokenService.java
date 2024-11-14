package com.example.agendamento.security;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.example.agendamento.model.Usuario;
import com.example.agendamento.repository.UsuarioRepository;

@Service
public class TokenService {
	@Autowired
	UsuarioRepository repository;

	public String gerarToken (Usuario usuario) {
		return JWT.create().withIssuer("Agendamentos")
				.withSubject(usuario.getNome())
				.withClaim("id", usuario.getId())
				.withExpiresAt(LocalDateTime.now()
						.plusDays(1)
						.toInstant(ZoneOffset.of("-03:00"))
						).sign(Algorithm.HMAC256("secretagendamento"));
	}
	
    public boolean validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256("secretagendamento"))
                    .withIssuer("Agendamentos")  
                    .build();
            verifier.verify(token); 
            return true;
        } catch (JWTVerificationException exception) {
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);  
        String username = decodedJWT.getSubject();
        UserDetails userDetails = repository.findByNome(username); 
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
