![SmartInfoLogo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfKYXmvIKdmGQ94aRom2nKEMoBdHWLcRLKMA&s)
# Prueba técnica SmartInfo!

## Punto 3 (Backend)

Requisitos:

 - Implementar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las entidades "Personas" y "Departamentos".
 - Relacionar cada persona con un departamento y permitir consultas SQL basadas en esta relación.
 - Asegurar que las consultas sean seguras y prevengan SQL Injection.

## Pre-requisitos

Clona el repositorio completo utilizando Git en tu escritorio o en a la carpeta que desees.

```bash
git clone https://github.com/jesusalberto11/PruebaSmartInfo.git
```
Copia los archivos de la carpeta `Punto 3/backend` al directorio `htdocs` de Apache (Elimina los archivos que estén en la carpeta htdocs), en Windows se encuentra en `C:\Apache\htdocs` y en Linux en `/var/www/htdocs`.

## Inicializando la base de datos

Una vez tengas los archivos del Punto 3 en la carpeta de `htdocs`, debes abrir tu editor de código en esta misma carpeta. 

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

Abre la terminal de tu base datos (o aplicación gráfica si tienes una) y ejecuta los siguientes script:

```sql
CREATE TABLE departments ( 
	id INT PRIMARY KEY AUTO_INCREMENT, 
	name VARCHAR(100) NOT NULL
);
```

```sql
CREATE TABLE persons ( 
	id INT PRIMARY KEY AUTO_INCREMENT, 
	name VARCHAR(100) NOT NULL,
	department_id INT,
	CONSTRAINT fk_departamento
		FOREIGN KEY (department_id)
		REFERENCES department(id)
		ON DELETE SET NULL;
);
```
Con esto crearemos las tablas necesarias para que la aplicación funcione.

## Probando

Sí todo está bien, accede a la IP de tu servidor de apache, `Ej: 127.0.0.1/index.php`deberías ver el menú principal de la página.

**Importante**: Debes configurar el Front-end para que la aplicación funcione correctamente.

