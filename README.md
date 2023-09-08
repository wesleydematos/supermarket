# Desafio - Shopper

## Tabela de Conteúdos

- [Iniciando o backend](#1-iniciando-o-backend)
- [Iniciando o frontend](#2-iniciando-o-frontend)

---

## 1. Iniciando o backend

[ Voltar para o topo ](#tabela-de-conteúdos)

- Após feito o clone do projeto em sua máquina acesse o diretório referente ao backend;
- Execute o seguinte comando para instalar todas as dependencias necessárias:

```
npm install
```

- Com as dependencias já instaladas é necessário criar um banco de dados MySQL em sua máquina;
- Localize o arquivo ".env.example" na base do projeto e em seguida preencha as variáveis de ambiente correspondentes ao banco de dados criado;
- IMPORTANTE: A variável de ambiente "PORT", que está relacionada a porta que a aplicação backend irá executar localmente, já está preenchida com o valor "3030" no arquivo de exemplo do .env, é importante não alterar pois a url utilizada no frontend pelo axios está setada com este valor, mas caso seja necessário a utilização de outra porta, abra a pasta referente ao frontend e siga o caminho -> src -> services -> api.js, nesse arquivo se encontra a baseURL utilizada pelo axios, caso esteja utilizando uma porta diferente da 3030 no backend é necessário alterar esta url presente no arquivo.
- Para testar se a conexão com o banco de dados está funcionando corretamente basta rodar, na pasta referente ao backend no terminal, o comando:

```
npm run dev
```

- Com as variáveis de ambiente preenchidas corretamente e a conexão com o banco funcionando o próximo passo é gerar e popular as tabelas no banco de dados executando a migration pré-definida, para isso execute o seguinte comando no terminal:

```
npm run typeorm migration:run -- -d src/data-source
```

- Com a migração persistida no banco de dados e a tabela criada é hora de colocar o servidor para funcionar novamente na porta definida:

```
npm run dev
```

- PRONTO!! O backend da aplicação já deve estar funcionando. :D

---

## 2. Iniciando o frontend

[ Voltar para o topo ](#tabela-de-conteúdos)

- Com o backend funcionando, em outro terminal, acesse a pasta referente ao frontend do projeto;
- Execute o seguinte comando para instalar todas as dependencias necessárias:

```
npm install
```

- Com as dependencias já instaladas agora é só inicializar a aplicação utilizando o seguinte comando:

```
npm run dev
```

- IMPORTANTE: Certifique-se que a porta que está sendo utilizada para executar o backend seja diferenta da utilizada para executar o front, feito isso a aplicação deve está funcionando perfeitamente.
