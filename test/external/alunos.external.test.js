import request from 'supertest';
import { expect } from 'chai';
import { getToken } from '../helpers/auth.js';


describe('POST /api/auth/login', () => {
    it.only('Deve cadastrar um aluno quando informar dados válidos', async () => {
        //Obter o token
        const token = await getToken('admin@escola.com', 'admin123');
        // const loginResposta = await request('http://localhost:3000')
        //       .post('/api/auth/login')
        //       .set('Content-type', 'application/json')
        //       .send({ 
        //         email: 'admin@escola.com', 
        //         senha: 'admin123' });

        // const token = loginResposta.body.token;     

        //cadastrar aluno
        const CadastroAlunoResposta = await request('http://localhost:3000')
              .post('/api/admin/alunos')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                nome: 'Fernanda Silva',
                email: 'fernanda.silva@example.com',
                matricula: '202023',
                senha: '123456'
                });

        //validar que o aluno foi cadastrado
        expect(CadastroAlunoResposta.status).to.equal(201); 
        expect(CadastroAlunoResposta.body.nome).to.equal('Fernanda Silva');
        expect(CadastroAlunoResposta.body.email).to.equal('fernanda.silva@example.com');
        expect(CadastroAlunoResposta.body.matricula).to.equal('202023');    
        

    });       
});
