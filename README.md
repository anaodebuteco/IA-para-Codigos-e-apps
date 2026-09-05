# IA-para-Codigos-e-apps

# Sentinel

**Sentinel by Ghost-Team**

Um modelo de linguagem desenvolvido do zero com foco em programação, desenvolvimento de aplicações e assistência inteligente para desenvolvedores.

O objetivo do projeto é construir, passo a passo, uma IA capaz de compreender linguagem natural e código, gerar e analisar programas, pesquisar documentação e, futuramente, executar tarefas de desenvolvimento através de ferramentas.

> **Status:** Em desenvolvimento

---

## Sobre o projeto

O Sentinel está sendo desenvolvido como um projeto próprio de inteligência artificial, começando pela implementação dos componentes fundamentais de um Transformer e evoluindo gradualmente para um sistema completo de IA para desenvolvimento de software.

O projeto não tem como objetivo simplesmente conectar uma interface a uma API externa de LLM. A proposta é construir e entender a própria base do modelo, incluindo arquitetura, tokenização, treinamento, geração e, posteriormente, ferramentas e agentes.

---

## Objetivo

O objetivo de longo prazo é transformar o Sentinel em uma plataforma de IA para desenvolvimento de software.

Entre as capacidades planejadas estão:

* Conversação e compreensão de linguagem natural
* Geração de código
* Análise e refatoração de código
* Criação de aplicações web
* Criação de aplicações mobile
* Detecção e correção de bugs
* Análise de imagens e interfaces
* Pesquisa na internet e documentação
* Execução de código e comandos
* Integração com projetos e repositórios
* Agentes capazes de executar tarefas de desenvolvimento

---

## Estado atual

O projeto já possui uma primeira versão funcional da base do modelo.

### Implementado

* Ambiente Python
* PyTorch
* Estrutura do projeto
* Self-Attention
* Máscara causal
* MLP
* LayerNorm
* Conexões residuais
* Transformer Block
* Transformer completo
* Multi-Head Attention
* Testes automatizados da arquitetura
* Tokenizador inicial
* Dataset para treinamento
* Função de perda
* Primeiro treinamento do modelo
* Geração autoregressiva de texto

O modelo atual é uma versão experimental pequena, utilizada principalmente para validar a arquitetura e o pipeline de treinamento.

Ele ainda não possui capacidade de programação comparável a modelos grandes.

---

## Tecnologias

Atualmente o projeto utiliza:

* Python
* PyTorch
* Git
* GitHub

O desenvolvimento inicial está sendo realizado em CPU, com foco em validar a arquitetura e o processo de treinamento antes de aumentar a escala do modelo.

---

## Estrutura do projeto

```text
Sentinel/
│
├── README.md
│
├── Docs/
│   ├── sobre_o_projeto.md
│   ├── arquitetura_do_projeto.md
│   ├── feito.md
│   ├── proximos_passos.md
│   ├── aonde_paramos.md
│   └── adicoes_futuras.md
│
├── model/
│   ├── attention.py
│   ├── mlp.py
│   ├── transformer_block.py
│   └── transformer.py
│
├── tokenizer/
│   └── tokenizer.py
│
├── training/
│   ├── dataset.py
│   ├── loss.py
│   └── train.py
│
├── inference/
│   └── generate.py
│
├── tests/
│   ├── test_transformer_completo.py
│   └── test_tokenizer.py
│
└── modelo_treinado.pt
```

---

## Como executar

Clone o repositório:

```bash
git clone https://github.com/anaodebuteco/IA-para-Codigos-e-apps.git
```

Entre no projeto:

```bash
cd Sentinel
```

Crie e ative o ambiente virtual:

```bash
python -m venv .venv
```

No Windows:

```bash
.venv\Scripts\activate
```

Instale as dependências necessárias e execute os testes.

Para executar o treinamento:

```bash
python -m training.train
```

Para testar a geração:

```bash
python -m inference.generate
```

---

## Roadmap

O desenvolvimento está sendo realizado gradualmente.

### Modelo

* [x] Self-Attention
* [x] Máscara causal
* [x] MLP
* [x] LayerNorm
* [x] Conexões residuais
* [x] Transformer Block
* [x] Transformer completo
* [x] Multi-Head Attention
* [x] Tokenizador inicial
* [x] Dataset
* [x] Função de perda
* [x] Primeiro treinamento
* [x] Geração de texto
* [ ] Treinamento V2
* [ ] Dataset maior
* [ ] Validação
* [ ] Avaliação do modelo
* [ ] Instruction tuning
* [ ] Sistema de pesquisa
* [ ] Ferramentas de execução

### Plataforma

Planejado para versões futuras:

* Sentinel
* Sentinel Code
* Sentinel Web
* Sentinel Mobile
* Sentinel Agent
* Sentinel Vision
* Sentinel Debug
* Sentinel API

Esses componentes fazem parte da visão futura do projeto e serão implementados conforme a base do Sentinel evoluir.

---

## Documentação

A documentação interna do projeto está localizada na pasta `Docs/`.

Ela contém informações sobre:

* arquitetura;
* decisões do projeto;
* funcionalidades implementadas;
* próximos passos;
* estado atual do desenvolvimento;
* ideias futuras.

---

## Desenvolvimento

O Sentinel está sendo desenvolvido de forma incremental.

A prioridade é construir, testar e compreender cada componente antes de avançar para a próxima etapa.

Cada evolução importante do projeto é registrada no Git para manter um histórico do desenvolvimento.

---

## Licença

Este projeto ainda está em definição quanto à licença.
