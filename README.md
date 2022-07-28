# Ignews 

Projeto Ignews feito na terceira trilha da rocketseat onde foi desenvolvido um blog onde para o usuario ter acessoa aos posts é necessario ter efetuado um pagamento na plataforma do Stripe.

### Considerações

Esse projeto me ajudou muito a evoluir e enteder como no dia a dia de um programador uma API e um CMS ajudam e facilitão na hora da criação do conteudo de seja um site ou blog, aprendi como consiliar pagamentos dentro de um site.

## interface da aplicação 

1 - Tela inicial

![home](https://user-images.githubusercontent.com/82763928/181138415-aa9720e1-4456-4fdd-a110-cf94d39b429f.JPG)

2 - Tela de posts

![posts](https://user-images.githubusercontent.com/82763928/181138492-9151ad10-e4a9-452e-910f-294aa7edf178.JPG)

3 - Tela de assinatura

![stripe chekout](https://user-images.githubusercontent.com/82763928/181138517-dbb79a94-68b9-4855-81e4-9a20ea5765f5.JPG)

4 - Postagem

![post](https://user-images.githubusercontent.com/82763928/181138559-a2c93be8-7359-488e-988e-9f76705d56f7.JPG)

## Tecnologias utilizada

As tecnologias utilizadas para a realização desse projeto foram:

- HTML
- CSS
- Java Srcipt
- Typescript

Frameworks :

- React Js
- Sass
- Next js

API :

- Stripe API

CMS:

- Prismic


## Intalação do projeto

-- É preciso ter um editor de código, [Vscode](https://code.visualstudio.com/) pode ajudar na hora de visializar a implementação.
 
 ````
 É preciso clonar o Repositório.
 
 É preciso ter instalado o yarn em sua maquina.
 
 No terminal dentro da pasta rode o comando yarn para instalar as dependencias.
 
 Pós as dependencias serem instaladas no terminal do Vs code rode o comando yarn start.
 
 Rode também o comando yarn dev, pós o comando ter sido executado entre em http://localhost:3000/ elá estará o projeto. 
 
 Em um terminal paralelo rode o comando ./stripe listen --forward-to localhost:3000/api/webhooks para que o estripe possa fazer o seu papel em paralelo
  

 ````


