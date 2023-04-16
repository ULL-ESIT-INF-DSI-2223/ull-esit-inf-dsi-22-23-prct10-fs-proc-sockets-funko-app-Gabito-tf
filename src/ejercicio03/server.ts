import * as net from 'net';
import * as fs from 'fs';
import { Funko } from './funko.js';
import chalk from 'chalk';

interface Message {
  [key: string]: any;
  usuario: string;
  type: string;
  command: string;
  id?: string;
  nombre?: string;
  descripcion?: string;
  tipo?: string;
  genero?: string;
  franquicia?: string;
  numero?: string;
  exclusivo?: boolean;
  caracteristicasEspeciales?: string;
  valor?: number;
}

function readFunko(message: Message, connection: net.Socket, dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    let found = false;
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = `${dirPath}/${file}`;
      const data = fs.readFileSync(filePath, 'utf-8');
      const funkoJSON = JSON.parse(data);
      if (funkoJSON.id === message.id) {
        const funko = new Funko(funkoJSON.id, funkoJSON.nombre, funkoJSON.descripcion, funkoJSON.tipo, funkoJSON.genero, funkoJSON.franquicia, funkoJSON.numero, funkoJSON.exclusivo, funkoJSON.caracteristicasEspeciales, funkoJSON.valor);
        connection.write(JSON.stringify({ 'type': 'reply', 'output': funko.print() }) + '\n');
        found = true;
        console.log(`Se ha enviado la información del funko ${funkoJSON.id} al cliente.`);
      }
    });
    if (found == false) {
      const noExisteFunko = chalk.red(`No existe ningún funko con el ID = ${message.id} en la colección de ${message.usuario}`);
      connection.write(JSON.stringify({ 'type': 'reply', 'output':noExisteFunko }) + '\n');
    }
  } else {
    const noExisteColeccion = chalk.red(`El usuario ${message.usuario} no tiene una colección`);
    connection.write(JSON.stringify({ 'type': 'reply', 'output': noExisteColeccion }) + '\n');
    return;
  }
}

function listFunkos(message: Message, connection: net.Socket, dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    connection.write(JSON.stringify({ 'type': 'reply', 'output': `${message.usuario} Funko Pop collection\n----------------------------` }) + '\n');
    let output = "";
    files.forEach(file => {
      const filePath = `${dirPath}/${file}`;
      const data = fs.readFileSync(filePath, 'utf-8');
      const funkoJSON = JSON.parse(data);
      const funko = new Funko(funkoJSON.id, funkoJSON.nombre, funkoJSON.descripcion, funkoJSON.tipo, funkoJSON.genero, funkoJSON.franquicia, funkoJSON.numero, funkoJSON.exclusivo, funkoJSON.caracteristicasEspeciales, funkoJSON.valor);
      output += funko.print() + '\n----------------------------\n';
    });
    connection.write(JSON.stringify({ 'type': 'reply', 'output': output }) + '\n');
    console.log(`Se ha enviado la lista de los funkos de ${message.usuario} al cliente.`);
  } else {
    const noExisteColeccion = chalk.red(`El usuario ${message.usuario} no tiene una colección`);
    connection.write(JSON.stringify({ 'type': 'reply', 'output': noExisteColeccion }) + '\n');
    return;
  }
}

function removeFunko(message: Message, connection: net.Socket, dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    let found = false;
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = `${dirPath}/${file}`;
      const data = fs.readFileSync(filePath, 'utf-8');
      const funkoJSON = JSON.parse(data);
      if (funkoJSON.id === message.id) {
        fs.unlinkSync(filePath);
        const eliminadoCorrectamente = chalk.green("Se ha eliminado correctamente el Funko con el ID = " + message.id + " en la colección de " + message.usuario);
        connection.write(JSON.stringify({ 'type': 'reply', 'output': eliminadoCorrectamente }) + '\n');
        found = true;
      }
    });
    if (found == false) {
      const noExisteFunko = chalk.red(`No existe ningún funko con el ID = ${message.id} en la colección de ${message.usuario}`);
      connection.write(JSON.stringify({ 'type': 'reply', 'output': noExisteFunko }) + '\n');
    }
  } else {
    const noExisteColeccion = chalk.red(`El usuario ${message.usuario} no tiene una colección`);
    connection.write(JSON.stringify({ 'type': 'reply', 'output': noExisteColeccion }) + '\n');
    return;
  }
}

function updateFunko(message: Message, connection: net.Socket, dirPath: string): void {
  let exist = false;
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = `${dirPath}/${file}`;
      const data = fs.readFileSync(filePath, 'utf-8');
      const funkoJSON = JSON.parse(data);
      if (funkoJSON.id === message.id) {
        exist = true;
        // Update properties
        for (const key in funkoJSON) {
          if (message[key] !== undefined) {
            funkoJSON[key] = message[key];
          }
        }

        fs.writeFileSync(filePath, JSON.stringify(funkoJSON, null, 2));
        const actualizadoCorrectamente = chalk.green(`El Funko con el ID = ${message.id} ha sido actualizado en la colección de ${message.usuario}`);
        connection.write(JSON.stringify({ 'type': 'reply', 'output': actualizadoCorrectamente }) + '\n');
      }
    });
    if (!exist) {
      const noExisteFunko = chalk.red(`No existe ningún funko con el ID = ${message.id} en la colección de ${message.usuario}`);
      connection.write(JSON.stringify({ 'type': 'reply', 'output': noExisteFunko }) + '\n');
    }
  } else {
    const noExisteColeccion = chalk.red(`El usuario ${message.usuario} no tiene una colección`);
    connection.write(JSON.stringify({ 'type': 'reply', 'output': noExisteColeccion }));
    return;
  }
}

function addFunko(message: Message, connection: net.Socket, dirPath: string): void {
  let exist = false;
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = `${dirPath}/${file}`;
      const data = fs.readFileSync(filePath, 'utf-8');
      const funkoJSON = JSON.parse(data);
      if (funkoJSON.id === message.id) {
        const yaExisteFunko = chalk.red(`Ya existe un Funko con el ID = ${message.id} en la colección de ${message.usuario}`);
        connection.write(JSON.stringify({ 'type': 'reply', 'output': yaExisteFunko }) + '\n');
        exist = true;
      }
    });

    if (exist === false) {
      const funkosJSON = {
        id: message.id,
        nombre: message.nombre,
        descripcion: message.descripcion,
        tipo: message.tipo,
        genero: message.genero,
        franquicia: message.franquicia,
        numero: message.numero,
        exclusivo: message.exclusivo,
        caracteristicasEspeciales: message.caracteristicasEspeciales,
        valor: message.valor
      }
      fs.writeFileSync(`${dirPath}/${message.id}.json`,
      JSON.stringify(funkosJSON, null, 2));
      const success = chalk.green('Se ha agregado el Funko con el ID = ' + message.id + ' a la colección de ' + message.usuario + '\n');
      connection.write(JSON.stringify({ 'type': 'reply', 'output': success}));
    }
  } else {
    fs.mkdirSync(dirPath);
    const funkosJSON = {
      id: message.id,
      nombre: message.nombre,
      descripcion: message.descripcion,
      tipo: message.tipo,
      genero: message.genero,
      franquicia: message.franquicia,
      numero: message.numero,
      exclusivo: message.exclusivo,
      caracteristicasEspeciales: message.caracteristicasEspeciales,
      valor: message.valor
    }
    fs.writeFileSync(`${dirPath}/${message.nombre}.json`, JSON.stringify(funkosJSON, null, 2));
    const success = chalk.green('Se ha agregado el Funko con el ID = ' + message.id + ' a la colección de ' + message.usuario + '\n');
    connection.write(JSON.stringify({ 'type': 'reply', 'output': success }) + '\n');
  }
}

const server = net.createServer((connection) => {
  console.log('Client connected');

  connection.on('data', (data) => {
    const message = JSON.parse(data.toString()) as Message;
    const dirPath = `users/${message.usuario}`;

    switch (message.command) {
      case 'read':
        readFunko(message, connection, dirPath);
        break;
      case 'list':
        listFunkos(message, connection, dirPath);
        break;
      case 'remove':
        removeFunko(message, connection, dirPath);
        break;
      case 'update':
        updateFunko(message, connection, dirPath);
        break;
      case 'add':
        addFunko(message, connection, dirPath);
        break;
      default:
        const noExisteAccion = chalk.red.bold('Tipo de acción no reconocida');
        connection.write(JSON.stringify({ 'type': 'reply', 'output': noExisteAccion }) + '\n');
        break;
    }
  });

  connection.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening at port 3000');
});