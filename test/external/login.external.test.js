// import { expect } from 'chai';


// describe('POST /api/auth/login', () => {


//   it('deve retornar 200 e um token quando o admin informar e-mail e senha corretos', async () => {
//     const resposta = await api()
//       .post('/api/auth/login')
//       .send({ email: 'admin@escola.com', senha: 'admin123' });

//     expect(resposta.status).to.equal(200);
//     expect(resposta.body).to.have.property('token');
//   });

//   it('deve retornar 401 quando a senha informada for inválida', async () => {
//     const resposta = await api()
//       .post('/api/auth/login')
//       .send({ email: 'admin@escola.com', senha: 'senha-incorreta' });

//     expect(resposta.status).to.equal(401);
//     expect(resposta.body.error).to.equal('E-mail ou senha inválidos.');
//   });

//   it('deve retornar 500 quando acontecer algum problema de conexão com banco de dados', async () => {
//     const authServiceMock = sinon.stub(authService, 'login');
//     authServiceMock.throws(new Error('ERROR - ERROR - ERROR -ERROR - ERROR'));

//     const loginResposta = await api()
//       .post('/api/auth/login')
//       .set('Content-type', 'application/json')
//       .send({ 
//         email: 'admin@escola.com', 
//         senha: 'admin123' });

//     expect(loginResposta.status).to.equal(500);
//     expect(loginResposta.body.error).to.equal('Erro interno do servidor.');

//     sinon.restore();
//   });
// });
