# TIA Token

Para compilar el proyecto, sigue estos pasos:

## Levanta la base de datos

Primero, levanta la base de datos PostgreSQL. Abre una terminal y ejecuta los siguientes comandos:

docker build -t postgres .
docker run -p 5433:5432 --name postgresc postgres

## Compila el Backend

Dirígete a la carpeta del backend y ejecuta los siguientes comandos:
cd backend
npm install
npm run dev


## Compila el Frontend

Luego, dirígete a la carpeta del frontend y ejecuta los siguientes comandos:

cd frontend
npm install
npm run dev


## Accede al Proyecto

Finalmente, abre tu navegador web y visita la siguiente dirección:

[http://127.0.0.1:5173/](http://127.0.0.1:5173/)

¡Listo! Ahora puedes acceder y trabajar en el proyecto.
