#Módulos
Carpeta contenedora de los módulos.

## Estructura de directorios
    module1/            --> archivos que se publicarán
      index.html        --> el template principal de la modulo.
      css/              --> archivos css
      fonts/            --> fuentes personalizadas
      img/              --> imágenes
      js/               --> archibos javascript
        app.js          --> aplicación
        controllers/    --> controllers de la aplicación
        directives/     --> directives de la aplicación
        filters/        --> filters de la aplicación
        services/       --> services de la aplicación
      lib/              --> librerias javascript de terceros
      partials/         --> angular view partials (templates)
      submoduleXX/      --> submodulos

	  
	controllers/: Aquí se encuentran todos los Controller AngularJS del Módulo a desarrollar. Esta carpeta está estructurada de la siguiente manera:
		nombre-submodulo/ --> carpeta que contendrá los Controllers del Submodulo el cual se va a desarrollar. Ejemplo: Débito Automático
			nombre-caso-uso/--> carpeta que contendrá los Controllers del caso de uso  el cual se va a desarrollar por submodulo. Ejemplo: administar-cuenta-debito
				administrar-nombre-recurso-controller.js: El nombre de cada archivo .js debe estar representado por la operación realizada en el caso de uso, siempre precedida de la palabra “controller”. Ejemplo: administar-cuenta-debito-controller.js,crear-recurso-controller.js,
				modificar-recurso-controller.js
	services/: archivos donde se definen los Servicios de la aplicación. Esta carpeta está estructurada de la siguiente manera:
		nombre-submodulo/ --> carpeta que contendrá los Servicios del Submodulo el cual se va a desarrollar. Ejemplo: Débito Automático. Se debe crear una carpeta por cada caso de uso
			nombre-caso-uso/ -->carpeta que contendrá los Servicios del caso de uso el cual se va a desarrollar por Submodulo. Ejemplo:cuenta-debito
				nombre-recuros-service.js: El nombre de cada archivo .js debe estar representado por el recurso que se debe consumir, siempre precedida de la palabra “service”. Ejemplo: cuenta-debito-service.js, detalle-cuenta-debito-service.js.
		comunes/--> carpeta que contendrá los Servicios Comunes del módulo. Ejemplo: Clientes y Numero de Línea. Solo se debe creae una carpeta comunes por cada módulo
			nombre-recuros-service.js: El nombre de cada archivo .js debe estar representado por el recurso que se debe consumir, siempre precedida de la palabra “service”. Ejemplo: cliente-service.js, numero-linea-service.js.
	partials/: se encuentran las paginas HTML, los partials (templates) que se asocian a cada Controllers.
		nombre-submodulo/--> carpeta que contendrá los Partials del Submodulo el cual se va a desarrollar. Ejemplo: Débito Automático
			nombre-caso-uso/--> carpeta que contendrá los Controllers del caso de uso  el cual se va a desarrollar por submodulo. Ejemplo: Cuenta Débito
				administrar-nombre-recurso-controller.js: El nombre de cada archivo .html  debe estar representado por la operación realizada en el caso de uso, siempre precedida de la palabra “partial”, y  cada palabra siempre separada por guion “-” Ejemplo: administar-cuenta-debito-partial.html
				crear-recurso-partial.html
				modificar-recurso-partial.html
