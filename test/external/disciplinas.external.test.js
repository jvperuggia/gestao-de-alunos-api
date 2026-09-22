import {api} from '../helpers/api.js';
import { expect } from 'chai';
import { comTokenDeAdmin } from '../helpers/auth.js';
import { novoAluno } from '../factories/alunosFactory.js';  
import { novaDisciplina } from '../factories/disciplinasFactory.js';    
import testesDeMatriculas from '../fixtures/matriculas.json'with {type: 'json'};   


describe('Testes do Trabalho Final - Perfil Admin', () => {

   testesDeMatriculas.forEach(testeDeMatricula => { 
    it(testeDeMatricula.testTitle, async () => {
    
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
     
});
