# IPFX - Clube de Xadrez IFSUL

Repositório oficial: [https://github.com/paulodallago/ipfx-ifsul](https://github.com/paulodallago/ipfx-ifsul)

Sistema web completo para o Clube de Xadrez do Instituto Federal Sul-rio-grandense (IFSUL), composto por um portal institucional para divulgação de eventos, notícias e galeria, além de uma área administrativa e CMS integrado para gestão de conteúdo.

---

## Arquitetura do Projeto

O projeto utiliza uma arquitetura moderna e autocontida (_All-in-One_):

- **Front-end**: Desenvolvido em **React** (v19) com componentes **PrimeReact**, **PrimeIcons**, **Swiper** e **React Router**.
- **Back-end / CMS**: Desenvolvido em **Golang** utilizando o framework **PocketBase**.
- **Banco de Dados**: **SQLite** embutido, gerenciado diretamente pelo PocketBase na pasta `pb_data/`.
- **Servidor Único**: O binário Go (`ipfx-server`) atua simultaneamente como servidor da API REST, gerenciador do banco de dados e servidor de arquivos estáticos da SPA React (`build/`), com fallback automático de rotas.

---

## Endpoints e Rotas Principais

| Rota                                                             | Descrição                                                                                                                                                                                                  |
| :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/home` (ou `/`)                                                 | **Página inicial do site**: Apresentação do clube, destaques, próximos eventos e novidades.                                                                                                                |
| `/admin`                                                         | **Painel de administração de conteúdo**: Interface customizada em React para gerenciamento de notícias, eventos, galeria, links e apoiadores. Requer autenticação de superusuário do PocketBase.           |
| `/_`                                                             | **Dashboard oficial do PocketBase**: Painel nativo do PocketBase para controle de coleções de dados, regras de acesso (API Rules), gerenciamento de contas superusuárias, logs e configurações do sistema. |
| `/noticias`, `/galeria`, `/timeline`, `/sobre`, `/faq`, `/links` | Rotas públicas do portal institucional.                                                                                                                                                                    |
| `/api/...`                                                       | Endpoints da API REST do PocketBase consumidos pelo front-end.                                                                                                                                             |

---

## Pré-requisitos para Desenvolvimento

- [Node.js](https://nodejs.org/) (versão LTS recomendada) e `npm`
- [Go (Golang)](https://go.dev/) (versão 1.23+)
- Git

---

## Ambiente de Desenvolvimento

1. **Instale as dependências do front-end:**

   ```bash
   npm install
   ```

2. **Inicie o ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   _Este comando utiliza `concurrently` para iniciar simultaneamente o servidor PocketBase (`0.0.0.0:8090`) e o servidor de desenvolvimento do React (`localhost:3000`)._

---

## Build e Compilação

O projeto inclui scripts automatizados no `package.json` para compilar o front-end React e gerar o executável do servidor Go:

### Build para Windows:

```bash
npm run build
```

- Compila os arquivos estáticos do React para a pasta `./build/`.
- Compila o binário Go para `./ipfx-server.exe`.

### Build para Linux:

```bash
npm run build-linux
```

- Compila os arquivos estáticos do React para a pasta `./build/`.
- Realiza a _cross-compilation_ do Go para arquitetura Linux AMD64, gerando o executável `./ipfx-server`.

---

## Deploy em Produção

Para publicar a aplicação em um servidor, são necessários apenas **3 itens** na mesma pasta:

1. **O executável do servidor**:
   - `ipfx-server.exe` (no Windows) ou `ipfx-server` (no Linux).
2. **A pasta `build/`**:
   - Contendo os arquivos compilados do front-end React.
3. **A pasta `pb_data/`**:
   - Contendo o banco de dados SQLite (`data.db`) e os arquivos de upload/mídia.

> 💡 **Nota no Linux**: Lembre-se de conceder permissão de execução ao binário:
>
> ```bash
> chmod +x ipfx-server
> ```

### Executando o Servidor:

#### No Windows:

```powershell
.\ipfx-server.exe serve --http=localhost:8090
```

_(ou altere para `--http=0.0.0.0:8090` para permitir conexões externas)_

#### No Linux:

```bash
./ipfx-server serve --http=0.0.0.0:8090
```

---

## 🔒 Como Configurar HTTPS (SSL/TLS)

Em ambientes de produção, o uso de HTTPS é fundamental. Existem duas maneiras recomendadas de habilitar HTTPS no PocketBase:

### Opção 1: Suporte Nativo do PocketBase (Auto-TLS com Let's Encrypt)

O PocketBase possui suporte nativo e automático para emissão e renovação de certificados SSL gratuitos via Let's Encrypt.

**Requisitos:**

- Seu servidor deve ter um endereço IP público e um domínio apontando para ele (ex: `xadrez.ifsul.edu.br`).
- As portas **80** (HTTP) e **443** (HTTPS) devem estar liberadas no firewall e não ocupadas por outro serviço (como Apache ou Nginx).

**Comando:**

```bash
./ipfx-server serve seu-dominio.com.br
```

Ou especificando as portas explicitamente:

```bash
./ipfx-server serve seu-dominio.com.br --http=0.0.0.0:80 --https=0.0.0.0:443
```

_O PocketBase gerencia e renova os certificados SSL automaticamente._

---

## 💾 Backup e Persistência de Dados

Todos os dados da aplicação estão centralizados no diretório **`pb_data/`**:

- `pb_data/data.db`: Banco de dados SQLite contendo todas as coleções, usuários e textos.
- `pb_data/storage/`: Armazenamento de imagens e anexos enviados pelo CMS.

Para realizar um backup completo:

1. Faça uma cópia segura da pasta `pb_data/`.
2. O PocketBase também disponibiliza uma ferramenta de backup automático diretamente no painel **Dashboard** (`/_/` -> _Settings_ -> _Backups_).

---

## 📄 Licença

Projeto desenvolvido para a comunidade acadêmica do IFSUL.
