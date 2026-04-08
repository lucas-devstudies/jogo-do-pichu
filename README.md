<p align="center">
  <img src="assets/logo.png" alt="Logo Jogo do Pichu" width="200">
</p>

# 🎮 Jogo do Pichu

> Projeto acadêmico inspirado no clássico "Jogo do Bicho", adaptado para o universo Pokémon e desenvolvido com foco em boas práticas de arquitetura, testes automatizados e deploy real.

---

## 🚀 Jogue Agora!
O projeto está hospedado e disponível para demonstração em um ambiente **AWS EC2**:
👉 **[Acesse o Jogo do Pichu aqui](http://56.125.221.121/)**

---

## 📝 Sobre o Projeto
O **Jogo do Pichu** foi desenvolvido por **Lucas Ferreira** durante a disciplina de *Laboratório de Produção de Software*, ministrada pelo professor **Ronem Lavareda** no **IFAM Parintins**. 

O projeto envolveu a aplicação de técnicas rigorosas de desenvolvimento, resultando em uma solução que alia aprendizado acadêmico e qualidade de mercado:
* **Arquitetura Limpa** e princípios de **Clean Code**.
* **Testes de Software** abrangentes.
* **Experiência do Usuário (UX)** aprimorada com temática Pokémon.

## ⚡ Por que esse nome?
O nome nasce de um trocadilho com o tradicional "Jogo do Bicho" e reflete a trajetória de Lucas Ferreira. Apaixonado pela franquia desde a infância, este é o quarto projeto acadêmico do autor inspirado nesse universo. A escolha do tema permitiu explorar novas regras de negócio e colocar em prática técnicas de UX de forma criativa e autêntica.

---

## 🛠️ Tecnologias e Qualidade
O projeto utiliza uma stack robusta, focada em performance e confiança do código:

* **Frontend:** [Angular](https://angular.io/)
* **Backend:** [Spring Boot](https://spring.io/projects/spring-boot) (Java 17)
* **Banco de Dados:** [MySQL](https://www.mysql.com/)
* **Testes Unitários:** [JUnit 5](https://junit.org/junit5/) (Garantia de integridade da lógica)
* **Cobertura de Código:** [JaCoCo](https://www.eclemma.org/jacoco/) (Monitoramento de métricas de testes)
* **Infraestrutura:** [Docker](https://www.docker.com/) e [AWS](https://aws.amazon.com/)
* **Recursos Externos:** [Bootstrap 5](https://getbootstrap.com/), [PokeAPI](https://pokeapi.co/) e [Figma](https://www.figma.com/design/88e1eQfMGgbBbAZTWeUenJ/Jogo-do-Pichu?node-id=18-79&t=ZAOJgHpxVcwcUsDJ-1)

---

## 🐳 Como Rodar Localmente (Docker)
Para rodar o ambiente completo (Front, Back e DB) no seu computador:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/jogo-do-pichu.git](https://github.com/seu-usuario/jogo-do-pichu.git)
    cd jogo-do-pichu
    ```

2.  **Suba os containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Acessos:**
    * **Frontend:** `http://localhost:4200` (ou porta 80 dependendo do seu .conf)
    * **Backend API:** `http://localhost:8080`

---

## ⚠️ Nota de Esclarecimento
Este projeto possui fins **estritamente acadêmicos e demonstrativos**. 
> O "Jogo do Bicho" original não é permitido pela legislação brasileira. Este software é apenas uma simulação para estudo de lógica de programação e **não envolve transações financeiras reais**.
