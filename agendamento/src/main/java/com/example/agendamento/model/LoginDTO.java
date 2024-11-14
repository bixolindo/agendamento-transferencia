package com.example.agendamento.model;

public class LoginDTO {
	
	private String nome;
	private String token;
	
	public LoginDTO(String nome, String token) {
		super();
		this.nome = nome;
		this.token = token;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	

}
