import 'mocha';
import {expect} from 'chai';
import net from "net";

describe('Servidor', function() {
    it('Debe retornar una respuesta', function(done) {
      const client = net.connect({ port: 60500 }, () => {
        const command = 'echo';
        const args:string = 'Prueba';
        const data = JSON.stringify({ command, args });
  
        client.write(data);
      });
  
      client.on('data', (data) => {
        const response = JSON.parse(data.toString());
  
        expect(response.result).to.equal('Prueba\n');
  
        client.end();
        done();
      });
    });
    it('Error comando invalido', function(done) {
      const client = net.connect({ port: 60500 }, () => {
        const command = 'ls';
        const args:string = '-abcde';
        const data = JSON.stringify({ command, args });
  
        client.write(data);
      });
  
      client.on('data', (data) => {
        const response = JSON.parse(data.toString());
  
        expect(response.error).to.eql("Command failed: ls -abcde\nls: invalid option -- 'e'\nTry 'ls --help' for more information.\n");
  
        client.end();
        done();
      });
    });
    it('Error comando inexistente', function(done) {
      const client = net.connect({ port: 60500 }, () => {
        const command = 'mkdirr';
        const args:string = 'prct11';
        const data = JSON.stringify({ command, args });
  
        client.write(data);
      });
  
      client.on('data', (data) => {
        const response = JSON.parse(data.toString());
  
        expect(response.error).to.equal("Command failed: mkdirr prct11\n/bin/sh: 1: mkdirr: not found\n");
  
        client.end();
        done();
      });
    });
  });