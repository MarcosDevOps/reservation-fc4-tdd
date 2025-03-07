# 🏡 Sistema de Reservas

Um sistema de reservas de propriedades desenvolvido com TypeScript, Express e TypeORM, seguindo os princípios de Desenvolvimento Orientado a Testes (TDD) e Design Orientado a Domínio (DDD).

## ✨ Funcionalidades

- **🏠 Gerenciamento de Propriedades**: Adicione, edite e remova propriedades.
- **👤 Registro de Usuários**: Crie e gerencie contas de usuários.
- **📅 Criação e Cancelamento de Reservas**: Reserve propriedades e cancele reservas conforme necessário.
- **💸 Descontos Automáticos**: Aplique descontos automaticamente para estadias de 7 noites ou mais.
- **🔄 Políticas de Cancelamento Flexíveis**: Diferentes regras de reembolso com base no tempo de cancelamento.
- **🌐 API REST**: Endpoints para todas as operações principais.

## 📋 Pré-requisitos

- **Node.js** (v14 ou superior)
- **npm** (Node Package Manager)
- **SQLite** (incluído como banco de dados de desenvolvimento)

## ⚙️ Instruções de Configuração

1. **Clone o repositório**:
```bash
git clone https://github.com/MarcosDevOps/reservation-fc4-tdd.git
cd reservation-fc4-tdd
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Banco de Dados**: O projeto usa SQLite como banco de dados de desenvolvimento, que não requer configuração adicional.

## 🧪 Executando os Testes

O projeto inclui testes unitários, de integração e de ponta a ponta. Para executar todos os testes:
```bash
npm test
```

## 📂 Estrutura do Projeto

```
src/
├── application/       # Serviços de aplicação e DTOs
├── domain/            # Entidades de domínio, repositórios e objetos de valor
└── infrastructure/    # Detalhes de implementação (persistência, web, etc.)
```

## 📚 Conceitos Principais

- **🏠 Propriedades**: Detalhes como capacidade e preços.
- **👤 Usuários**: Usuários que podem fazer reservas.
- **📅 Reservas**: Reservas feitas por usuários para propriedades.
- **🔄 Regras de Cancelamento**: Políticas de reembolso baseadas no tempo de cancelamento.
  - **Reembolso Total**: Mais de 7 dias antes do check-in.
  - **Reembolso Parcial (50%)**: Entre 1-7 dias antes do check-in.
  - **Sem Reembolso**: Menos de 24 horas antes do check-in.

## 🌐 Endpoints da API

### 👤 Usuários
- `POST /users` - Criar um novo usuário.

### 🏠 Propriedades
- `POST /properties` - Criar uma nova propriedade.

### 📅 Reservas
- `POST /bookings` - Criar uma nova reserva.
- `POST /bookings/:id/cancel` - Cancelar uma reserva existente.

## 💻 Desenvolvimento

O projeto segue práticas de TDD, com cobertura de testes abrangente, incluindo:
- **🧪 Testes Unitários**: Para entidades e serviços de domínio.
- **🔗 Testes de Integração**: Para repositórios.
- **🌐 Testes de Ponta a Ponta**: Para endpoints da API.

## 🛠️ Tecnologias Utilizadas

- **TypeScript**
- **Express.js**
- **TypeORM**
- **SQLite**
- **Jest**
- **Supertest** (para testes de API)

## 📞 Contato

Para dúvidas ou mais informações, entre em contato:

- **E-mail**: [marcoscon@msn.com](mailto:marcoscon@msn.com)
- **LinkedIn**: [Marcos da Conceição](https://www.linkedin.com/in/marcosdaconceicao)