import {api} from '../helpers/api.js';
import { expect } from 'chai';
import { comTokenDeAdmin } from '../helpers/auth.js';
import { comTokenDeAluno } from '../helpers/auth.js';
import { novoAluno } from '../factories/alunosFactory.js';  
import { novaDisciplina } from '../factories/disciplinasFactory.js';    
import { novoTrabalho } from '../factories/trabalhosFactory.js';
//import testesDeMatriculas from '../fixtures/matriculas.json'with {type: 'json'};   




describe('Testes do Trabalho Final - Perfil Aluno', () => {

    it('Validar a entrega um trabalho por usuário Aluno logado', async () => {
        //Logar com aluno
        const resposta = await api()
        .post('/api/auth/login')
        .send({ email: 'ana.souza@example.com', senha: '123456' });
        expect(resposta.status).to.equal(200);

        const token = resposta.body.token;
        //entregar trabalho
            const cadastrarTrabalhoResposta = await api()
             .post('/api/alunos/aluno-ana-souza/trabalhos')
             .set('Content-type', 'application/json')
             .set('Authorization', await comTokenDeAluno())
             .send(novoTrabalho()); 
            expect(cadastrarTrabalhoResposta.status).to.equal(201);
            console.log(`O trabalho: ${cadastrarTrabalhoResposta.body.titulo}, foi entregue com sucesso!`);

    });
     

});
