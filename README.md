![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-pocketbase-master

Este pacote contém nós personalizados para integrar o PocketBase com o n8n.

## Instalação

### No n8n

1. Vá para **Settings > Community Nodes**
2. Selecione **Install**
3. Digite `n8n-nodes-pocketbase-master` no campo de busca
4. Clique em instalar

### Manualmente

```bash
npm install n8n-nodes-pocketbase-master
```

## Operações Suportadas

### Record

O nó suporta as seguintes operações para registros:

#### Create
- Cria um novo registro em uma coleção
- Parâmetros:
  - Collection: Nome da coleção
  - Data: Dados do registro em formato JSON

#### Create with Files
- Cria um novo registro com upload de arquivos
- Parâmetros:
  - Collection: Nome da coleção
  - Fields Data: Campos regulares do registro
  - Binary Property: Propriedade binária contendo os arquivos
  - File Field Names: Nomes dos campos que receberão os arquivos

#### Delete
- Remove um registro específico
- Parâmetros:
  - Collection: Nome da coleção
  - Record ID: ID do registro a ser removido

#### Get
- Obtém um registro específico
- Parâmetros:
  - Collection: Nome da coleção
  - Record ID: ID do registro
  - Expand Relations: Lista de relações a serem expandidas

#### Get Many
- Obtém múltiplos registros com suporte a filtros e paginação
- Parâmetros:
  - Collection: Nome da coleção
  - Return All: Se deve retornar todos os resultados
  - Limit: Número máximo de resultados (se Return All for false)
  - Filter: Critérios de filtro
  - Sort: Ordenação dos resultados
  - Expand Relations: Lista de relações a serem expandidas

#### Multi-Table Query
- Consulta registros em múltiplas tabelas simultaneamente
- Parâmetros para cada tabela:
  - Collection Name: Nome da coleção
  - Filter: Critérios de filtro específicos da tabela
  - Fields: Campos a serem retornados
  - Expand Relations: Lista de relações a serem expandidas
  - Limit: Número máximo de resultados
- Opções adicionais:
  - Merge Results: Combina resultados baseado em um campo comum
  - Merge Field: Campo usado para combinar resultados
  - Remove Duplicates: Remove entradas duplicadas ao combinar

#### Update
- Atualiza um registro existente
- Parâmetros:
  - Collection: Nome da coleção
  - Record ID: ID do registro
  - Data: Novos dados em formato JSON

#### Update with Files
- Atualiza um registro existente com suporte a arquivos
- Parâmetros:
  - Collection: Nome da coleção
  - Record ID: ID do registro
  - Fields Data: Campos regulares do registro
  - Binary Property: Propriedade binária contendo os arquivos
  - File Field Names: Nomes dos campos que receberão os arquivos
  - Append Files: Se deve anexar ou substituir arquivos existentes

## Expansão de Relações

O nó agora suporta expansão de relações em várias operações (Get, Get Many, Multi-Table Query). Isso permite buscar dados relacionados em uma única consulta.

### Exemplos de Uso

1. **Buscar aluno com sua turma e colégio:**
   ```
   Expand Relations: "turma,turma.colegio"
   ```

2. **Buscar turma com todos os alunos e professor:**
   ```
   Expand Relations: "alunos,professor"
   ```

3. **Buscar colégio com turmas e seus respectivos professores:**
   ```
   Expand Relations: "turmas,turmas.professor"
   ```

### Sintaxe de Expansão

- Use vírgula (,) para expandir múltiplas relações
- Use ponto (.) para expandir relações aninhadas
- Exemplo: "relacao1,relacao2.subrelacao,relacao3"

## Autenticação

O nó suporta dois métodos de autenticação:

1. **Email/Senha**
   - Use credenciais de administrador do PocketBase
   - Recomendado para desenvolvimento e testes

2. **Token de API**
   - Use um token de API gerado no PocketBase
   - Recomendado para produção

## Tratamento de Erros

O nó inclui tratamento robusto de erros e validações:
- Verificação de autenticação
- Validação de parâmetros
- Mensagens de erro descritivas
- Opção de continuar em caso de falha

## Exemplos

### Buscar Alunos de uma Turma Específica

```json
{
  "operation": "getMany",
  "collection": "alunos",
  "filter": "turma.id = 'abc123'",
  "expand": "turma,turma.colegio"
}
```

### Atualizar Foto do Perfil do Aluno

```json
{
  "operation": "updateWithFiles",
  "collection": "alunos",
  "recordId": "xyz789",
  "fileFieldNames": "foto_perfil",
  "appendFiles": false
}
```

### Consulta Multi-Tabela com Relações

```json
{
  "operation": "multiTableQuery",
  "tables": [
    {
      "collection": "alunos",
      "expand": "turma",
      "filter": "ativo = true"
    },
    {
      "collection": "professores",
      "expand": "turmas,departamento",
      "filter": "status = 'ativo'"
    }
  ],
  "options": {
    "mergeResults": true,
    "mergeField": "turma_id"
  }
}
```

## Licença

[MIT](LICENSE.md)

# n8n-nodes-pdf-page-split

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

> Nó comunitário para n8n que permite dividir documentos PDF em páginas individuais

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-pdf-page-split.svg)](https://www.npmjs.com/package/n8n-nodes-pdf-page-split)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Visão Geral

Este nó permite que você divida arquivos PDF de várias páginas em arquivos PDF individuais de página única, facilitando o processamento, armazenamento e distribuição de documentos. É particularmente útil para fluxos de trabalho que envolvem processamento de documentos, como extração de dados, arquivamento ou distribuição de conteúdo.

## Principais Funcionalidades

- 📄 **Divisão de PDF**: Divide PDFs de várias páginas em arquivos PDF individuais
- 🔢 **Seleção de Páginas**: Especifique intervalos de páginas para processar apenas páginas específicas
- 📝 **Nomenclatura Personalizada**: Configure prefixos e formatos para os nomes dos arquivos de saída
- 🔄 **Processamento em Lote**: Suporte para processamento de múltiplos PDFs em uma única execução

## Instalação

### Via interface do n8n

1. Abra sua instância do n8n
2. Vá para **Configurações > Nós da Comunidade**
3. Selecione **Instalar**
4. Digite `n8n-nodes-pdf-page-split` no campo **Nome**
5. Clique em **Instalar**

### Via npm

```bash
npm install n8n-nodes-pdf-page-split
```

### Via yarn

```bash
yarn add n8n-nodes-pdf-page-split
```

## Compatibilidade

Este nó foi projetado para ser altamente compatível com diversos ambientes onde o n8n pode ser executado:

- ✅ Windows, macOS e Linux (incluindo Alpine Linux)
- ✅ Arquiteturas x86_64 e ARM64
- ✅ Contêineres Docker sem dependências adicionais
- ✅ n8n versão 0.147.0 ou superior

## Como Usar o Nó

### Parâmetros

#### Entrada
- **Propriedade Binária**: Nome da propriedade binária que contém o arquivo PDF (padrão: `data`)

#### Opções de Saída
- **Prefixo do Nome do Arquivo**: Prefixo para os nomes dos arquivos de saída (padrão: `page_`)
- **Incluir Número da Página**: Se deve incluir o número da página nos nomes dos arquivos
- **Iniciar Numeração Em**: O número para começar a contar as páginas (padrão: 1)
- **Intervalo de Páginas**: Intervalo de páginas a serem divididas (ex: "1-5,8,11-13"). Deixe vazio para dividir todas as páginas

### Saída

O nó gera cada página como um item separado com as seguintes propriedades:

- **Binário**: Dados da página em formato PDF
- **JSON**:
  - `pageNumber`: O número da página no documento original
  - `totalPages`: Número total de páginas no documento original

## Exemplos de Uso

### Exemplo 1: Dividir um PDF e salvar as páginas

Este exemplo mostra como dividir um PDF em páginas individuais e salvá-las no sistema de arquivos:

1. **HTTP Request** → Baixa um PDF de uma URL
2. **PDF Page Split** → Divide o PDF em páginas individuais
   - Configure "Binary Property" como "data"
   - Em "Output Options", defina "File Name Prefix" como "pagina_"
3. **Write Binary File** → Salva cada página como um arquivo separado
   - Configure "File Name" como `{{$json["pageNumber"]}}_{{$binary.data.fileName}}`

### Exemplo 2: Processar apenas páginas específicas

Este exemplo mostra como processar apenas determinadas páginas de um PDF:

1. **Read Binary File** → Carrega um PDF local
2. **PDF Page Split** → Divide o PDF, selecionando apenas algumas páginas
   - Configure "Binary Property" como "data"
   - Em "Output Options", defina "Page Range" como "1-3,5,10-12"
3. **Google Drive** → Faz upload das páginas selecionadas para o Google Drive

## Resolução de Problemas

Se você encontrar problemas ao usar este nó, verifique o seguinte:

### Problemas Comuns

- **Erro "No binary data found"**: Certifique-se de que o nó anterior está produzindo dados binários
- **PDF sem páginas**: Verifique se o PDF é válido e contém páginas
- **Memória insuficiente**: Ao processar PDFs grandes, certifique-se de que o n8n tem memória suficiente disponível

### Dicas de Solução

- Certifique-se de que seu arquivo PDF não está protegido por senha
- Para PDFs muito grandes, tente definir intervalos de páginas menores para processamento
- Se o PDF estiver corrompido, tente regenerá-lo antes de processá-lo

## Detalhes Técnicos

Este nó utiliza a biblioteca [pdf-lib](https://pdf-lib.js.org/), que é uma solução puramente JavaScript para manipulação de PDFs, eliminando a necessidade de dependências nativas. Isso garante alta compatibilidade com diversos ambientes.

### Limitações

- O nó não suporta a extração de texto ou metadados das páginas do PDF
- PDFs protegidos por senha precisam ser desprotegidos antes do processamento

## Contribuição

Contribuições são bem-vindas! Consulte o [CONTRIBUTING.md](CONTRIBUTING.md) para obter informações sobre como contribuir para este projeto.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
