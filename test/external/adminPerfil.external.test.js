import {api} from '../helpers/api.js';
import { expect } from 'chai';
import { comTokenDeAdmin } from '../helpers/auth.js';
import { comTokenDeAluno } from '../helpers/auth.js';
import { novoAluno } from '../factories/alunosFactory.js';  
import { novaDisciplina } from '../factories/disciplinasFactory.js';    
import { novoTrabalho } from '../factories/trabalhosFactory.js'; 


describe('Testes do Trabalho Final - Perfil Admin/Aluno', () => {


    it('Validar que um aluno recem cadastrado pode ser matriculado em uma nova disciplina, se logar e realizar a entrega de um trabalho.', async () => {
    //Logar com admin
        const resposta = await api()
        .post('/api/auth/login')
        .send({ email: 'ana.souza@example.com', senha: '123456' });
        expect(resposta.status).to.equal(200);
        //cadastrar aluno
        const cadastrarAlunoResposta = await api()
            .post('/api/admin/alunos')
            .set('Content-type', 'application/json')
            .set('Authorization', await comTokenDeAdmin())
            .send(novoAluno());      
        const alunoId = cadastrarAlunoResposta.body.id;
        expect (cadastrarAlunoResposta.status).to.equal(201);

              
         //Cadastrar disciplina
        const cadastrarDisciplinaResposta = await api()
              .post('/api/admin/disciplinas')
              .set('Content-type', 'application/json')
              .set('Authorization', await comTokenDeAdmin())
              .send(novaDisciplina());
        const disciplinaId = cadastrarDisciplinaResposta.body.id;
        expect (cadastrarDisciplinaResposta.status).to.equal(201);


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
        
        // console.log(`${cadastrarAlunoResposta.body.nome} foi cadastrado(a) como Aluno(a)`)
        // console.log(`e matriculado(a) na disciplina ${cadastrarDisciplinaResposta.body.nome}!`)

        // editando --- login aluno e etc
        const respostaAlunoLogin = await api()
            .post('/api/auth/login')
            .send({ email: cadastrarAlunoResposta.body.email, senha: '123456' });
        expect(respostaAlunoLogin.status).to.equal(200);

       // const token = resposta.body.token;
        
        //entregar trabalho
        const cadastrarTrabalhoResposta = await api()
             .post('/api/alunos/aluno-ana-souza/trabalhos')
             .set('Content-type', 'application/json')
             .set('Authorization', await comTokenDeAluno())
             .send(novoTrabalho()); 
        expect(cadastrarTrabalhoResposta.status).to.equal(201);


        console.log(`${cadastrarAlunoResposta.body.nome} foi cadastrado(a) como Aluno(a) e matriculado(a) na disciplina ${cadastrarDisciplinaResposta.body.nome}!`)
        console.log(`\nEm seguida, ${cadastrarAlunoResposta.body.nome} relizou login e entregou o trabalho: ${cadastrarTrabalhoResposta.body.titulo}, da disciplina ${cadastrarDisciplinaResposta.body.nome}.`);

    });

//    testesDeMatriculas.forEach(testeDeMatricula => { 
//     it.only(testeDeMatricula.testTitle, async () => {
    
//         //cadastrar aluno
//         const cadastrarAlunoResposta = await api()
//             .post('/api/admin/alunos')
//             .set('Content-type', 'application/json')
//             .set('Authorization', await comTokenDeAdmin())
//             .send(novoAluno());    
//         const alunoId = cadastrarAlunoResposta.body.id;     
              
//          //Cadastrar disciplina
//         const cadastrarDisciplinaResposta = await api()
//               .post('/api/admin/disciplinas')
//               .set('Content-type', 'application/json')
//               .set('Authorization', await comTokenDeAdmin())
//               .send(novaDisciplina());
//         const disciplinaId = cadastrarDisciplinaResposta.body.id;

//         // Matricular aluno em disciplina
//         const matricularAlunoEmDisciplinaResposta = await api()
//               .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
//               .set('Content-type', 'application/json')
//               .set('Authorization', await comTokenDeAdmin())
//               .send({
//                 alunoId: alunoId
//                 });
//         expect(matricularAlunoEmDisciplinaResposta.status).to.equal(201);
//         expect(matricularAlunoEmDisciplinaResposta.body.alunoId).to.equal(alunoId);
//         expect(matricularAlunoEmDisciplinaResposta.body.disciplinaId).to.equal(disciplinaId);
//         });
//     });

});
