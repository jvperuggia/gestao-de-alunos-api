import request from 'supertest';
import { expect } from 'chai';


describe('POST /api/auth/login', () => {
    it.only('Deve cadastrar um aluno quando informar dados válidos', async () => {
        //Obter o token
        const loginResposta = await request('http://localhost:3000')
              .post('/api/auth/login')
              .set('Content-type', 'application/json')
              .send({ 
                email: 'admin@escola.com', 
                senha: 'admin123' });

        const token = loginResposta.body.token;     

        //cadastrar aluno
        const CadastroAlunoResposta = await request('http://localhost:3000')
              .post('/api/admin/alunos')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                nome: 'Fernando Silva',
                email: 'fernando.silva@example.com',
                matricula: '202022',
                senha: '123456'
                });

        //validar que o aluno foi cadastrado
        expect(CadastroAlunoResposta.status).to.equal(201); 
        expect(CadastroAlunoResposta.body.nome).to.equal('Fernando Silva');
        expect(CadastroAlunoResposta.body.email).to.equal('fernando.silva@example.com');
        expect(CadastroAlunoResposta.body.matricula).to.equal('202022');    
        

    });       
});
