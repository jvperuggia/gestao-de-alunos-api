import request from 'supertest';
import { expect } from 'chai';
import { getToken } from '../helpers/auth.js';


describe('Testes de Disciplinas', () => {
    let token;

    before(async () => {
        //Obter o token
        token = await getToken('admin@escola.com', 'admin123');
    });

    it('Cadastrar disciplina', async () => {
          
        //Cadastrar disciplina
        const cadastrarDisciplinaResposta = await request('http://localhost:3000')
              .post('/api/admin/disciplinas')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                nome: "Algebra Linear",
                codigo: "ALL666",
                cargaHoraria: 70
                });
              
        //validar que disciplina foi cadastrado
         expect(cadastrarDisciplinaResposta.status).to.equal(201); 
         expect(cadastrarDisciplinaResposta.body.nome).to.equal('Algebra Linear'); 
         expect(cadastrarDisciplinaResposta.body.codigo).to.equal('ALL666');      
         expect(cadastrarDisciplinaResposta.body.cargaHoraria).to.equal(70);      

         console.log('Disciplina cadastrada:', cadastrarDisciplinaResposta.body.nome);

    });

    //REQUISITOS: 1) Aluno cadastrado, 2) Disciplina cadastrada
    it('Matricular aluno em disciplina', async () => {
          
        //Cadastrar aluno em disciplina disciplina
        const cadastrarAlunoEmDisciplinaResposta = await request('http://localhost:3000')
              .post('/api/admin/disciplinas/disciplina-historia/matriculas')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                alunoId: "aluno-ana-souza"
                });
              
        //validar que disciplina foi cadastrado
         expect(cadastrarAlunoEmDisciplinaResposta.status).to.equal(201); 
         expect(cadastrarAlunoEmDisciplinaResposta.body.alunoId).to.equal('aluno-ana-souza');
         expect(cadastrarAlunoEmDisciplinaResposta.body.disciplinaId).to.equal('disciplina-historia');      

         console.log('Aluno matriculado:', cadastrarAlunoEmDisciplinaResposta.body.alunoId);
         console.log('Disciplina:', cadastrarAlunoEmDisciplinaResposta.body.disciplinaId);

    });

    it.only('Validar que um aluno recem cadastrado pode ser matriculado em uma nova disciplina', async () => {
    
        //cadastrar aluno
        const cadastrarAlunoResposta = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Ana Souza',
                email: 'ana.medeiros@example.com',
                matricula: '2024029',
                senha: '123456'
            });      
        const alunoId = cadastrarAlunoResposta.body.id;        
              
         //Cadastrar disciplina
        const cadastrarDisciplinaResposta = await request('http://localhost:3000')
              .post('/api/admin/disciplinas')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                nome: "Algebra Linear 2",
                codigo: "ALL667",
                cargaHoraria: 40
                });
        const disciplinaId = cadastrarDisciplinaResposta.body.id;
        
        // Matricular aluno em disciplina
        const matricularAlunoEmDisciplinaResposta = await request('http://localhost:3000')
              .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                alunoId: alunoId
                });

        expect(matricularAlunoEmDisciplinaResposta.status).to.equal(201);
        expect(matricularAlunoEmDisciplinaResposta.body.alunoId).to.equal(alunoId);
        expect(matricularAlunoEmDisciplinaResposta.body.disciplinaId).to.equal(disciplinaId);        

    });


});
