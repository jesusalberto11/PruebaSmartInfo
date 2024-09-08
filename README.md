![SmartInfoLogo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfKYXmvIKdmGQ94aRom2nKEMoBdHWLcRLKMA&s)
# Prueba técnica SmartInfo!

Bienvenido al repositorio en donde se encuentran mis soluciones a la prueba técnica, antes de comenzar debemos revisar un par de detalles.

## Pre-requisitos

Para poder ejecutar los proyectos correctamente vas a necesitar tener instalado en tu sistema operativo:

 1. PHP (Min ver. 8)
 2. MySQL o PostgreSQL
 3. Apache2 (Linux) o Apache24 (Windows)
 4. NodeJS (Min ver. 18)
 5. ReactJS (Para el tercer punto)
 6. Editor de código

## Inicializando la base de datos

Una vez tengas instalado MySQL o PostgreSQL, debes crear la base de datos que utilizaremos en el proyecto, abre la terminal de tu base datos (o aplicación gráfica si tienes una) y ejecuta el siguiente script:

```sql
  CREATE DATABASE sinfo;
```

Con esto tenemos la base de datos que utilizaremos en el proyecto.

## Configurando Apache

[Aquí](https://www.scriptcase.net/docs/es_es/v9//manual/02-scriptcase-installation/05-windows_php/) puedes ver como instalar PHP y Configurar Apache en Windows (Omite la instalación de Scriptcase).

Ahora, para facilitar las peticiones que vamos a estar constantemente realizado al servidor, podemos desactivar las restricciones que Apache coloca por defecto.

**ATENCIÓN**, esto es sumamente importante debido a que el servidor y los archivos que se encuentran en este quedarán temporalmente expuestos ante todo tipo de ataques.

En tu archivo `httpd.conf` (Windows), puedes colocar lo siguiente en la directiva "Directory"

    <Directory />
	    AllowOverride none
	    Header set Access-Control-Allow-Origin "*"
	    Header set Access-Control-Allow-Headers "Content-Type"
	    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
	    Require all granted
    </Directory/>

Esto permitirá que puedas hacer peticiones directamente al servidor sin que este las bloqueé (CORS).

**Importante**:  Puedes colocar la dirección IP de tu maquina en "Header set Access-Control-Allow-Origin 'tu_ip'" para que solo tú puedas hacer las peticiones.

## Probando

Sí todo está bien, deberías de tener tu servidor de PHP y Apache funcionando en Windows junto a la base de datos que hayas escogido.

**Ahora puedes clonar y ejecutar los proyectos en tu servidor**.

