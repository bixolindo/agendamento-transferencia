package com.example.agendamento.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@EnableWebSecurity
public class Configurations implements WebMvcConfigurer {

	private static final Logger logger = LoggerFactory.getLogger(Configurations.class);

	@Autowired
	private JwtTokenFilter jwtTokenFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		logger.info("Configuring SecurityFilterChain");

		http.cors().and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeHttpRequests().antMatchers(HttpMethod.POST, "/usuarios").permitAll()
				.antMatchers(HttpMethod.POST, "/login").permitAll().antMatchers(HttpMethod.GET, "/hello").permitAll()
				.anyRequest().authenticated();

		http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		logger.info("Configuring AuthenticationManager");
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		logger.info("Configuring PasswordEncoder (BCrypt)");
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:4200")  // Permite o acesso do frontend Angular
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
			.allowedHeaders("*")
			.allowCredentials(true);
	}

}
