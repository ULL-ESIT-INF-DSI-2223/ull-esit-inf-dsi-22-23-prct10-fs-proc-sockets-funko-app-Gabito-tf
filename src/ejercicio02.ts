import fs from "fs";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { spawn } from "child_process";

interface Opciones {
  _: string[];
  $0: string;
  lineas?: boolean;
  palabras?: boolean;
  caracteres?: boolean;
  pipe?: boolean;
}

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

const archivo = opciones._[0];

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
