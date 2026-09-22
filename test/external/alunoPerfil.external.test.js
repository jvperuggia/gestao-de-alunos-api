import {api} from '../helpers/api.js';
import { expect } from 'chai';
import { comTokenDeAluno } from '../helpers/auth.js';  
import { novoTrabalho } from '../factories/trabalhosFactory.js';


describe('Testes do Trabalho Final - Perfil Aluno', () => {

    it('Validar a entrega um trabalho por usuário Aluno logado', async () => {
        //Logar com aluno
        const resposta = await api()
        .post('/api/auth/login')
        .send({ email: 'ana.souza@example.com', senha: '123456' });
        expect(resposta.status).to.equal(200);

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
