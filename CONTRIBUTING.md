# Contribuindo para n8n-nodes-pdf-page-split

Agradecemos seu interesse em contribuir para o projeto n8n-nodes-pdf-page-split! Este documento fornece diretrizes para contribuições e ajuda a tornar o processo mais fácil e eficaz para todos.

## Como Contribuir

### Reportando Bugs

Se você encontrar um bug, por favor crie uma issue no GitHub com as seguintes informações:

1. **Título**: Uma descrição clara e concisa do problema
2. **Descrição**: Detalhes sobre o bug e como reproduzi-lo
3. **Ambiente**: Informações sobre seu ambiente (versão do n8n, sistema operacional, etc.)
4. **Logs**: Se aplicável, inclua logs de erro relevantes
5. **Screenshots**: Se aplicável, adicione screenshots para ajudar a explicar o problema

### Sugerindo Melhorias

Para sugerir melhorias, crie uma issue no GitHub com:

1. **Título**: Uma descrição clara da melhoria proposta
2. **Descrição**: Explique por que esta melhoria seria útil e como poderia ser implementada
3. **Exemplos**: Se possível, forneça exemplos de uso ou implementações similares

### Pull Requests

Seguimos o modelo [Github Flow](https://guides.github.com/introduction/flow/). Para contribuir com código:

1. Faça um fork do repositório
2. Crie uma branch a partir de `master` para sua feature ou correção (`git checkout -b feature/nome-da-feature`)
3. Faça suas alterações com commits claros e descritivos
4. Empurre sua branch para o GitHub
5. Submeta um Pull Request para a branch `master` do repositório original

#### Diretrizes para Pull Requests

- Siga o estilo de código existente
- Atualize o README.md com detalhes de mudanças na interface, se aplicável
- Adicione ou atualize testes quando necessário
- Mantenha o Pull Request pequeno e focado em uma única mudança
- Documente bem o seu código

## Desenvolvimento Local

### Configuração do Ambiente

Para configurar seu ambiente de desenvolvimento:

1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/n8n-nodes-pdf-page-split.git
   cd n8n-nodes-pdf-page-split
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Vincule o pacote à sua instalação local do n8n (opcional)
   ```bash
   npm link
   cd ~/.n8n/custom
   npm link n8n-nodes-pdf-page-split
   ```

### Comandos Úteis

- `npm run build`: Compila o código TypeScript
- `npm run dev`: Compila e observa alterações nos arquivos
- `npm run lint`: Executa o linter para encontrar problemas de código
- `npm run format`: Formata o código usando Prettier

## Estrutura do Projeto

```
n8n-nodes-pdf-page-split/
├── nodes/                      # Código dos nós
│   └── PdfPageSplit/           # Implementação do nó PdfPageSplit
│       ├── PdfPageSplit.node.ts# Código principal do nó
│       └── pdfPageSplit.svg    # Ícone do nó
├── credentials/                # Credenciais (se necessário)
├── dist/                       # Código compilado (gerado)
├── package.json                # Configuração do pacote npm
├── tsconfig.json               # Configuração do TypeScript
└── README.md                   # Documentação do projeto
```

## Diretrizes de Codificação

### Estilo de Código

- Use TypeScript para todo o código
- Siga as convenções de estilo do n8n
- Documente funções e classes com comentários JSDoc
- Use nomes descritivos para variáveis e funções

### Testes

- Escreva testes para novas funcionalidades
- Garanta que todos os testes passem antes de submeter um PR
- Considere adicionar testes para bugs que você corrigir

## Agradecimentos

Sua contribuição é valiosa para o projeto. Agradecemos o tempo e esforço que você dedica para melhorar o n8n-nodes-pdf-page-split! 
