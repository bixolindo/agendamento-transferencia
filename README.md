# Projeto de Agendamento de Transferências

Este projeto é composto por um frontend em Angular e um backend em Java Spring Boot para agendar transferências financeiras. Ele inclui autenticação JWT e validação de dados no frontend.

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Configuração do Backend (Spring Boot)](#configuração-do-backend-spring-boot)
- [Configuração do Frontend (Angular)](#configuração-do-frontend-angular)
- [Estrutura de Endpoints](#estrutura-de-endpoints)
- [Funcionalidades](#funcionalidades)

---

### Pré-requisitos

- **Java 11+**
- **Node.js** (versão 14 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)
- **Angular CLI** (para rodar comandos Angular)
- **MySQL** (para o banco de dados do backend)

---

## Configuração do Backend (Spring Boot)

### 1. Clone o projeto e navegue até a pasta do backend:

git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_BACKEND>

###  2. Configure o Banco de Dados e a porta do servidor no application.properties 
Como por exemplo : 
- server.port=8080
- spring.datasource.url=jdbc:h2:mem:testdb
- spring.datasource.driverClassName=org.h2.Driver
- spring.datasource.username=agendamentodb
- spring.datasource.password=agendamentodb
- spring.h2.console.enabled=true
- spring.jpa.hibernate.ddl-auto=update

### 3. Inicie o Servidor Spring Boot
Para iniciar o serviço basta rodar o comando : mvnw spring-boot:run

O backend estará disponível em http://localhost:8080.

### 4. Endpoints do Backend
- POST /usuarios - Utiliza para Criar um usuario que você irá utilizar para logar no sistema ( Tela de Criação de usuario não foi implementada, é necessario criar por aqui utilizando Postman ou algo parecido ).

-- Objeto a enviar ex: 
  {
    "nome": "Gustavo",
    "senha": "123"
  }


- Os demais endpoints são acessados normalmente pela aplicação WEB

 ### 5. Configuração do Frontend (Angular)

- Navegue até a pasta do frontend:
cd <PASTA_DO_FRONTEND>
- Instale as dependências
Execute o seguinte comando para instalar todas as dependências necessárias:
```console
npm install
```
- Configure o URL do Backend
No arquivo environment.ts, localizado em src/environments/, atualize a URL base para a API do backend:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
- Inicie o Servidor Angular
Para iniciar o frontend, execute:
```console
ng serve
```
O projeto Angular estará disponível em http://localhost:4200.




