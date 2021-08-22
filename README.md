# Trivias
Trivias es una aplicación de preguntas sobre diferentes temáticas.
Registrate con un nombre de usuario y contraseña para entrar a la aplicación, seleccionar una categoría y contestar 20 preguntas aleatorias.
Tu tiempo de solución de la trivia y total de aciertos son agregados a tus records personales y si eres listo al top ten!
Además como administrador puedes registrar nuevas categorías y nuevas preguntas.
Esta api es consumida por la aplicación cliente Angular que puedes consultar [aquí](https://github.com/AlejandroCN/trivias-backed "aquí").
## Comenzando 🚀
La aplicación hace uso del servicio Storage de Firebase para almacenar las imágenes de las categorías creadas, por ello debes crear una aplicación de Firebase y configurar la función Storage, crea un directorio (o un árbol de directorios) para almacenar las imágenes de las categorías y después configura el archivo: src/environments/firebase.environment.ts de la siguiente forma:
```
export const firebaseConfig = {
  firebaseConfig: {
    apiKey: 'tu-api-key',
    authDomain: 'dominio-app.com',
    projectId: 'tu-project-id',
    storageBucket: 'storage-bucket',
    messagingSenderId: 'message-sender',
    appId: 'app-id',
    measurementId: 'measurement-id',
  },
  directoriosFirebase: {
    categorias: 'tu/directorio/firebase'
  }
};
```
La propiedad 'directoriosFirebase' debe hacer referencia al directorio que configuraste previamente en el Storage de tu aplicación Firebase para almacenar las imágenes de las categorías.
### Pre-requisitos 📋
* [Node JS](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io)
### Instalación 🔧
En la raíz del proyecto:
```
ng serve -o
```
Para levantar la aplicación en la dirección por defecto: http://localhost:4200
## Despliegue 📦
Asegurate de agregar la URL base de tu backend al archivo src/environments/environment.prod.ts de la siguiente manera:
```
export const environment = {
  production: false,
  apiUrl: 'http://ejemplo.com',
  ...firebaseConfig,
};
```
Posteriormente en la raíz del proyecto ejecuta:
```
ng build --prod
```
Los archivos estáticos para desplegar a tu servidor se generarán en el directorio dist/trivias/

## Construido con 🛠️
* [Angular 11](https://cli.angular.io) - El framework web usado para frontend
* [Node Package Manager](https://nodejs.org/en/) - Manejador de dependencias
