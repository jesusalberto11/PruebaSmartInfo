![SmartInfoLogo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfKYXmvIKdmGQ94aRom2nKEMoBdHWLcRLKMA&s)
# Prueba técnica SmartInfo!

## Punto 2

Requisitos:

 - El menú de navegación principal del sitio web debe ser generado dinamicamente desde una base de datos. 
 - Los elementos del menú, como "Personas", "Ciudades", "Departamentos", etc., deben ser gestionados desde la base de datos y no estar codificados directamente en HTML.

## Pre-requisitos

Clona el repositorio completo utilizando Git en tu escritorio o en al carpeta que desees.

```bash
git clone https://github.com/jesusalberto11/PruebaSmartInfo.git
```
Copia los archivos de la carpeta `Punto 2` al directorio `htdocs` de Apache (Elimina los archivos que estén en la carpeta htdocs), en Windows se encuentra en `C:\Apache\htdocs` y en Linux en `/var/www/htdocs`.

## Inicializando la base de datos

Una vez tengas los archivos del Punto 2 en la carpeta de `htdocs`, debes abrir tu editor de código en esta misma carpeta. 

En tu editor de código dirígete al archivo `connection.php` el cual está ubicado en la carpeta `config` y ábrelo, verás esto:

```php
  <?php
  class  Connection
  {
	  public  $host  =  "";
	  public  $dbname  =  "sinfo";
	  public  $port  =  "";
	  public  $user  =  "";
	  public  $password  =  "";
	  public  $driver  =  "";
	  public  $connect;
	  
public  static  function  getConnection()
//Resto del código...
```

En este archivo debes modificar el valor de las variables: `host`, `port`, `user`, `password` y `driver`, para hacerlas coincidir con tu base datos (MySQL o PostgreSQL),

**Importante**: El valor de la variable `driver` debe ser `mysql` (MySQL) o `psql` (PostgreSQL) según la base de datos que tengas instalada.

## Creado las tablas del proyecto

Abre la terminal de tu base datos (o aplicación gráfica si tienes una) y ejecuta el siguiente script:

```sql
CREATE TABLE menu ( 
	id INT PRIMARY KEY AUTO_INCREMENT, 
	nombre VARCHAR(255) NOT NULL, 
	url VARCHAR(255) NOT NULL, 
	parent_id INT NULL,
	item_order INT NOT NULL 
);
```
Con esto crearemos la tabla necesaria para que la aplicación funcione.

## Probando

Sí todo está bien, accede a la IP de tu servidor de apache, `Ej: 127.0.0.1/index.php` y deberías ver el menú principal de la página.

