import request from 'supertest';
import { expect } from 'chai';
import { getToken } from '../helpers/auth.js';


describe('POST /api/auth/login', () => {
    let token;

    before(async () => {
        //Obter o token
        token = await getToken('admin@escola.com', 'admin123');
    });

    it('Deve cadastrar um aluno quando informar dados válidos', async () => {
          
        //cadastrar aluno
        const CadastroAlunoResposta = await api()
              .post('/api/admin/alunos')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                nome: 'Marta Silva',
                email: 'marta.silva@example.com',
                matricula: '202026',
                senha: '123456'
                });

        //validar que o aluno foi cadastrado
        expect(CadastroAlunoResposta.status).to.equal(201); 
        expect(CadastroAlunoResposta.body.nome).to.equal('Marta Silva');
        expect(CadastroAlunoResposta.body.email).to.equal('marta.silva@example.com');
        expect(CadastroAlunoResposta.body.matricula).to.equal('202026');    

    });       

    it('Deve negar o cadastro de um aluno quando informar dados de aluno já cadastrado', async () => {
        
        //tentar cadastrar aluno ja existente
        const CadastroAlunoResposta = await api()
              .post('/api/admin/alunos')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send({
                nome: 'Ana Souza',
                email: 'ana.souza@example.com',
                matricula: '2024001',
                senha: '123456'
                });

        //validar que o aluno já estava cadastrado
        expect(CadastroAlunoResposta.status).to.equal(409); 
        expect(CadastroAlunoResposta.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.'); 
        
    });

    it('Deve consultar um aluno cadastrado', async () => {
          
        //consultar aluno
        const consultarAlunoResposta = await api()
              .get('/api/admin/alunos/aluno-bruno-lima')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              
        //validar que o aluno foi consultado
         expect(consultarAlunoResposta.status).to.equal(200); 
         expect(consultarAlunoResposta.body.nome).to.equal('Bruno Lima');
         expect(consultarAlunoResposta.body.email).to.equal('bruno.lima@example.com');
         expect(consultarAlunoResposta.body.matricula).to.equal('2024002');    

         console.log('Aluno consultado:', consultarAlunoResposta.body.nome);
         console.log('Matrícula:', consultarAlunoResposta.body.matricula);

    });

    it('Consultar um aluno não cadastrado', async () => {
          
        //consultar aluno nãao cadastrado
        const consultarAlunoResposta = await api()
              .get('/api/admin/alunos/id-nao-cadastrado')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              
        //validar que o aluno consultado não existe
         expect(consultarAlunoResposta.status).to.equal(404); 
         console.log('Aluno não cadastrado', consultarAlunoResposta.body.nome);

    });


});
