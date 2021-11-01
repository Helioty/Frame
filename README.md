![ionic-framework-og](/uploads/4090368b1c3f6aa2ff80f640569b7c2a/ionic-framework-og.png)

# Ionic Frame

# Sobre o projeto


O Frame é um projeto pre-configurado e estruturado com base no style-guide do angular, com a finalidade de padronizar os projetos construidos em Ionic para a Ferreira Costa.

# Arquitetura

Em sua pasta principal a SRC temos a pasta APP onde deverá estar todo o codigo da aplicação, que por sua vez possui 3 pastas. A primeira é a Config onde se encontra a configuração que pega a URL de acesso a serviços da filial por IP (Funciona apenas no Mobile por questões de Proxy), e também os endpoints dos serviços (ENV). A segunda pasta é a Page, onde se encontram as paginas da aplicação, geradas via Ionic Cli (ionic generate) lembre-se de ao gerar o nome da pagina deve-se colocar o diretorio ex.: ionic generate page page/nomeDaPagina. A terceira e talvez mais importante pasta é a Shared onde serão colocados todos os serviços compartilhados por toda a aplicação como components, guards, pipes, services e etc. Diversos serviços, pipes e outros estão pre-configurados e requerem apenas que sejam importados para serem utilizados.

#### Padrões de Codigo:

O padrão de formatação de codigo foi configurado via Angular-eslint e Prettier. 
```
Para verificar formatação: ng lint
Para formatar o codigo: ng lint --fix
```

#### Dependencias do Projeto:

- Node.js v14+

- NPM v7.22.0+

- @ionic/cli v6.17.0+

- Cordova v10

- Cordova-android v9.1

### Run the App
```
ionic serve  /  ionic s
```

### Build's

Para disponibilizar a aplicação temos algumas configurações já feitas entre elas o cordova para gerar APK's Nativos para Mobile e Apache para servidores Apache HTTP (Inclue arquivo .htaccess de configuração para funcionar na imagem Apache do OKD).

##### Web
```
Test: ionic build

Production: ionic build --prod
```

##### Mobile
```
Test: ionic cordova build android

Production: ionic cordova build android --prod
```
