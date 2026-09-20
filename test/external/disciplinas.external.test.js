import {api} from '../helpers/api.js';
import { expect } from 'chai';
import { comTokenDeAdmin } from '../helpers/auth.js';
import { novoAluno } from '../factories/alunosFactory.js';  
import { novaDisciplina } from '../factories/disciplinasFactory.js';


describe('Testes de Disciplinas', () => {

    it('Cadastrar disciplina', async () => {
          
        //Cadastrar disciplina
        const cadastrarDisciplinaResposta = await api()
              .post('/api/admin/disciplinas')
              .set('Content-type', 'application/json')
              .set('Authorization', await comTokenDeAdmin())
              .send(novaDisciplina());
              
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
        const cadastrarAlunoEmDisciplinaResposta = await api()
              .post('/api/admin/disciplinas/disciplina-historia/matriculas')
              .set('Content-type', 'application/json')
              .set('Authorization', await comTokenDeAdmin())
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
        const cadastrarAlunoResposta = await api()
            .post('/api/admin/alunos')
            .set('Content-type', 'application/json')
            .set('Authorization', await comTokenDeAdmin())
            .send(novoAluno());      
        const alunoId = cadastrarAlunoResposta.body.id;     
              
         //Cadastrar disciplina
        const cadastrarDisciplinaResposta = await api()
              .post('/api/admin/disciplinas')
              .set('Content-type', 'application/json')
              .set('Authorization', await comTokenDeAdmin())
              .send(novaDisciplina());
        const disciplinaId = cadastrarDisciplinaResposta.body.id;

        // Matricular aluno em disciplina
        const matricularAlunoEmDisciplinaResposta = await api()
              .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
              .set('Content-type', 'application/json')
              .set('Authorization', await comTokenDeAdmin())
              .send({
                alunoId: alunoId
                });

        expect(matricularAlunoEmDisciplinaResposta.status).to.equal(201);
        expect(matricularAlunoEmDisciplinaResposta.body.alunoId).to.equal(alunoId);
        expect(matricularAlunoEmDisciplinaResposta.body.disciplinaId).to.equal(disciplinaId);

    });


});
