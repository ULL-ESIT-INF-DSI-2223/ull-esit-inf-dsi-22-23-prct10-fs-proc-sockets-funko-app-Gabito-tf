# Práctica 10 

Gabi Vacaru, alu0101098340
<br>
Desarrollo de Sistemas Informáticos


## Índice de contenidos<a name="id0"></a>
  - [Ejercicio 1](#id1)

  - [Ejercicio 2](#id2)
    - [Añadir](#id2.1)
    - [Modificar](#id2.2)
    - [Eliminar](#id2.3)
    - [Listar](#id2.4)
    - [Mostrar](#id2.5)

  - [Ejercicio 3](#id3)

  ### Ejercicio 1<a name="id1"></a>
  Nos encontramos con un programa que utiliza el módulo 'fs' de Node.js para monitorear cambios en un archivo específico. Al ejecutar el programa, teneoms que poner un nombre de archivo como argumento, este verifica si el archivo existe, en caso afirmativo, comienza a monitorearlo. Cada vez que el archivo se modifica, el programa muestra un mensaje en la consola informando que el archivo ha sido modificado de alguna manera.

  Para ejecutar el programa, debemos poner el siguiente comando en la consola:
  ```typescript
    node dist/ejercicio1.js <nombre_archivo>
    ```

    Para resumir el comportamiento de mismo lo voy a reducir a una tabla:

    | Paso | Pila de llamadas                     | Registro de eventos API| Cola de manejadores | Mensajes consola                                    |
    |------|--------------------------------------|------------------------|---------------------|-----------------------------------------------------|
    | 1    | Vacía                                |                        |                     |                                                     |
    | 2    | Función de devolución de llamada     |                        |                     |                                                     |
    | 3    | Vacía                                |                        |                     | "Starting to watch file helloworld.txt"             |
    | 4    |                                      | Evento 'change'        |                     | "File helloworld.txt is no longer watched"          |
    | 5    |                                      |                        | Manejador 'change'  |                                                     |
    | 6    | Manejador de eventos 'change'        |                        |                     | "File helloworld.txt has been modified somehow" (1) |
    | 7    | Vacía                                |                        |                     |                                                     |
    | 8    |                                      |                        | Manejador 'change'  |                                                     |
    | 9    | Manejador de eventos 'change'        |                        |                     | "File helloworld.txt has been modified somehow" (2) |
    | 10   | Vacía                                |                        |                     |                                                     |

    La función access en el módulo 'fs' de Node.js se utiliza para verificar si un archivo existe y si se puede acceder con los permisos requeridos. La función access es asíncrona y acepta una función de devolución de llamada (callback) que se ejecuta cuando se completa la verificación.

    En el programa proporcionado, la función access se llama con los argumentos filename, constants.F_OK y una función de devolución de llamada. La función verifica si el archivo filename existe utilizando la flag constants.F_OK.

    El objeto constants es parte del módulo 'fs' y contiene constantes relacionadas con el módulo. Estas constantes incluyen flags de acceso a archivos y otras constantes utilizadas en las operaciones de archivos. En este caso, se utiliza constants.F_OK para la comprobación de la existencia del archivo en la función access. constants.F_OK es una flag que indica que la función access debe verificar solo la existencia del archivo, independientemente de si se puede leer, escribir o ejecutar.

### Ejercicio 2<a name="id2"></a>

    En este ejercicio, se nos pide que creemos un programa que dado un archivo por consola, ejecute el comando WC, para poder contar en número de líneas, palabras y caracteres que tiene el archivo. Tambien se nos pide que realizemos el programa de dos formas distinas, una de ellas usando pipes y la otra usando streams.

    Para ejecutar el programa, debemos poner el siguiente comando en la consola:
    ```typescript
    node dist/ejercicio2.js <nombre_archivo> --pipe --lineas --palabras --caracteres
    ```
    En cuanto al código del mismo importamos los módulos necesarios para poder ejecutar el programa, en este caso, los módulos 'fs' y 'yargs' de Node.js. También importamos la función spawn del módulo 'child_process' de Node.js, que se utiliza para ejecutar comandos en una nueva terminal.
    ```typescript
    import fs from "fs";
    import yargs from "yargs/yargs";
    import { hideBin } from "yargs/helpers";
    import { spawn } from "child_process";
    ```

    Luego hemos creado una interfaz para poder definir los argumentos que se le pasan al programa, en este caso, el nombre del archivo y las flags que se le pasan al programa para que nos muestre el número de líneas, palabras y caracteres que tiene el archivo.
    ```typescript
        interface Opciones {
    _: string[];
    $0: string;
    lineas?: boolean;
    palabras?: boolean;
    caracteres?: boolean;
    pipe?: boolean;
    }
    ```

    Para poder ejecutar esto desde terminal, hemos configurado el yards:
    ```typescript
        const opciones: Opciones = yargs(hideBin(process.argv))
    .usage("Uso: node $0 <Archivo> [opciones]")
    .option("pipe", {
        alias: "p",
        describe: "Utilizar método pipe",
        type: "boolean",
    })
    .option("lineas", {
        alias: "l",
        describe: "Ver número de líneas",
        type: "boolean",
    })
    .option("palabras", {
        alias: "w",
        describe: "Ver número de palabras",
        type: "boolean",
    })
    .option("caracteres", {
        alias: "c",
        describe: "Ver número de caracteres",
        type: "boolean",
    })
    .demandCommand(1).argv as unknown as Opciones;
    ```
    En este caso, hemos definido que el programa necesita un argumento obligatorio, que es el nombre del archivo, y que además, se le pueden pasar las flags que hemos definido en la interfaz.

    En cuanto a la funcion principal del programa, es decir la ejecucion del conmando WC, primero comprobamos si el archivo existe, en caso afirmativo, ejecutamos el comando WC, en caso contrario, mostramos un mensaje de error.
    En caso de que el archivo exista y se le hayan pasado las flags, guardamos los flags en un vector de flags, y ejecutamos el comando WC con las flags correspondntes siempre y cuando se haya pasado mínimo una. El orden es indiferente.

    Una vez lanzado el spawn, se comprueba si se ha pasado el flag --pipe, en caso afirmativo, se utiliza el método pipe para mostrar el resultado por pantalla, en caso contrario, se utiliza el método on para mostrar el resultado por pantalla.

    ```typescript
        fs.access(archivo, fs.constants.F_OK, (err) => {
    if (err) {
        console.error(`El archivo ${archivo} no existe`);
        process.exit(1);
    } else {
        const wcOpciones: string[] = [];

        if (opciones.lineas) wcOpciones.push("-l");
        if (opciones.palabras) wcOpciones.push("-w");
        if (opciones.caracteres) wcOpciones.push("-c");

        if (wcOpciones.length === 0) {
        console.error(
            "Debe especificar al menos una opcion: --lineas, --palabras o --caracteres"
        );
        process.exit(1);
        } else {
        const wc = spawn("wc", wcOpciones.concat(archivo));

        if (opciones.pipe) {
            console.log("Utilizando método pipe");
            wc.stdout.pipe(process.stdout);
            wc.stderr.pipe(process.stderr);
        } else {
            console.log("Utilizando método on");
            wc.stdout.on("data", (data) => {
            process.stdout.write(data);
            });

            wc.stderr.on("data", (data) => {
            process.stderr.write(data);
            });
        }
        }
    }
    });
    ```



