<p align="center">
  <img src="assets/logo.png" alt="Logo Jogo do Pichu" width="200">
</p>

# 🎮 Jogo do Pichu

> Projeto acadêmico inspirado no clássico "Jogo do Bicho", adaptado para o universo Pokémon e desenvolvido com foco em boas práticas de arquitetura e qualidade de software.

## 📝 Sobre o Projeto
O **Jogo do Pichu** foi desenvolvido por **Lucas Ferreira** durante a disciplina de *Laboratório de Produção de Software*, ministrada pelo professor **Ronem Lavareda** no **IFAM Parintins**. 

O objetivo principal foi aplicar conceitos avançados de desenvolvimento, incluindo:
* **Testes de Software** (Unitários e Integração).
* **Arquitetura Limpa** e princípios de **Clean Code**.
* **Experiência do Usuário (UX)** aprimorada.
* **Regras de Negócio** complexas aplicadas a um ambiente simulado.

---

## ⚡ Por que esse nome?
O nome nasce de um trocadilho com o tradicional "Jogo do Bicho" e reflete a trajetória acadêmica do criador. Lucas Ferreira, apaixonado por Pokémon, já havia desenvolvido outros três projetos inspirados na franquia. 

Ao chegar na disciplina do Prof. Ronem Lavareda, decidiu unir essa afinidade temática ao desafio técnico de criar uma aplicação robusta, transformando o aprendizado em algo criativo e com identidade própria. O resultado é uma mistura de humor, técnica e paixão pela tecnologia.

---

## 🛠️ Tecnologias e Recursos
O projeto utiliza uma stack moderna e amplamente adotada no mercado:

* **Frontend:** [Angular](https://angular.io/) (Interface dinâmica e responsiva)
* **Backend:** [Spring Boot](https://spring.io/projects/spring-boot) (API REST robusta com Java)
* **Banco de Dados:** [MySQL](https://www.mysql.com/) (Persistência de dados)
* **Estilização:** [Bootstrap 5](https://getbootstrap.com/)
* **Consumo de Dados:** [PokeAPI](https://pokeapi.co/) (Base de dados dos Pokémons)
* **Design:** [Protótipo no Figma](https://www.figma.com/design/88e1eQfMGgbBbAZTWeUenJ/Jogo-do-Pichu?node-id=18-79&t=ZAOJgHpxVcwcUsDJ-1)

---

## 🐳 Como Rodar com Docker
Para facilitar o deploy e o desenvolvimento, o projeto está totalmente "dockerizado". Certifique-se de ter o **Docker** e o **Docker Compose** instalados.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/jogo-do-pichu.git](https://github.com/seu-usuario/jogo-do-pichu.git)
    cd jogo-do-pichu
    ```

2.  **Suba os containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Acesse a aplicação:**
    * **Frontend:** `http://localhost:4200`
    * **Backend API:** `http://localhost:8080`

---

## ⚠️ Nota de Esclarecimento
Este projeto possui fins **estritamente acadêmicos e demonstrativos**. 
> O "Jogo do Bicho" original não é permitido pela legislação brasileira. Este software é apenas uma simulação para estudo de lógica de programação e **não envolve transações financeiras reais**.