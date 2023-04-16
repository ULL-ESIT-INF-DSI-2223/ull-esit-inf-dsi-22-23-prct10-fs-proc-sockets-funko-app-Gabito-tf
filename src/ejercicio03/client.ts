import yargs, { Arguments, Options } from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as net from 'net';

const client = net.connect({ port: 3000 });

const handleAddCommand = (argv: Arguments) => {
  client.write(JSON.stringify({
    'type': 'command', 'command': 'add', 'usuario': argv.usuario, 'id': argv.id, 'nombre': argv.nombre, 'descripcion': argv.descripcion, 'tipo': argv.tipo, 'genero': argv.genero, 'franquicia': argv.franquicia, 'numero': argv.numero, 'exclusivo': argv.exclusivo, 'caracteristicasEspeciales': argv.caracteristicasEspeciales, 'valor': argv.valor
  }));

  client.on('data', (dataJSON) => {
    const message = JSON.parse(dataJSON.toString());
    if (message.type === 'reply') {
      console.log(message.output);
    }
  });
};

const handleUpdateCommand = (argv: Arguments) => {
  client.write(JSON.stringify({
    'type': 'command', 'command': 'update', 'usuario': argv.usuario, 'id': argv.id, 'descripcion': argv.descripcion, 'tipo': argv.tipo, 'genero': argv.genero, 'franquicia': argv.franquicia, 'numero': argv.numero, 'exclusivo': argv.exclusivo, 'caracteristicasEspeciales': argv.caracteristicasEspeciales, 'valor': argv.valor
  }));

  client.on('data', (dataJSON) => {
    const message = JSON.parse(dataJSON.toString());
    if (message.type === 'reply') {
      console.log(message.output);
    }
  });
};

const handleRemoveCommand = (argv: Arguments) => {
  client.write(JSON.stringify({ 'type': 'command', 'command': 'remove', 'usuario': argv.usuario, 'id': argv.id }));

  client.on('data', (dataJSON) => {
    const message = JSON.parse(dataJSON.toString());
    if (message.type === 'reply') {
      console.log(message.output);
    }
  });
};

const handleListCommand = (argv: Arguments) => {
  client.write(JSON.stringify({ 'type': 'command', 'command': 'list', 'usuario': argv.usuario, 'id': argv.id }));

  client.on('data', (dataJSON) => {
    const message = JSON.parse(dataJSON.toString());
    if (message.type === 'reply') {
      console.log(message.output);
    }
  });
};

function handleReadCommand(argv: Arguments): void {
  client.write(JSON.stringify({ type: 'command', command: 'read', usuario: argv.usuario, id: argv.id }));

  client.on('data', (dataJSON) => {
    const message = JSON.parse(dataJSON.toString());
    if (message.type === 'reply') {
      console.log(message.output);
    }
  });
}


const commonOptions = {
  id: {
    description: 'Funko ID',
    type: 'number' as const,
    demandOption: true,
  },
  usuario: {
    description: 'User',
    type: 'string' as const,
    demandOption: true,
  },
};

const addOptions = {
  nombre: {
    description: 'Funko Name',
    type: 'string' as const,
    demandOption: true,
  },
  descripcion: {
    description: 'Funko description',
    type: 'string' as const,
    demandOption: true,
  },
  tipo: {
    description: 'Funko tipo',
    type: 'string' as const,
    demandOption: true,
  },
  genero: {
    description: 'Genero de la serie',
    type: 'string' as const,
    demandOption: true,
  },
  franquicia: {
    description: 'Funko franquicia',
    type: 'string' as const,
    demandOption: true,
  },
  numero: {
    description: 'Numero de la serie',
    type: 'number' as const,
    demandOption: true,
  },
  exclusivo: {
    description: 'Es exclusivo',
    type: 'boolean' as const,
    demandOption: true,
  },
  caracteristicasEspeciales: {
    description: 'Caracteristicas especiales del funko',
    type: 'string' as const,
    demandOption: true,
  },
  valor: {
    description: 'Valor del funko',
    type: 'number' as const,
    demandOption: true,
  },
};

function makeOptionsOptional(options: { [key: string]: Options }): { [key: string]: Options } {
  const optionalOptions: { [key: string]: Options } = {};
  for (const key in options) {
    optionalOptions[key] = { ...options[key], demandOption: false };
  }
  return optionalOptions;
}


const optionalAddOptions = makeOptionsOptional(addOptions);

yargs(hideBin(process.argv))
  .command('add', 'Adds a funko', { ...commonOptions, ...addOptions }, handleAddCommand)
  .command('update', 'update a funko', { ...commonOptions, ...optionalAddOptions }, handleUpdateCommand)
  .command('remove', 'Remove a funko from the collection', commonOptions, handleRemoveCommand)
  .command('list', 'List a funko collection', { usuario: commonOptions.usuario }, handleListCommand)
  .command('read', 'Show a concrete funko from the collection', commonOptions, handleReadCommand)
  .help()
  .argv;
