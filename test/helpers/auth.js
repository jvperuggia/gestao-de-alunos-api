import {api} from './api.js';
import 'dotenv/config.js';

export async function getToken(emailUser, senhaUser) {
    const loginResposta = await api()
                  .post('/api/auth/login')
                  .set('Content-type', 'application/json')
                  .send({ 
                    email: emailUser, 
                    senha: senhaUser 
                    });
            
              return loginResposta.body.token;      
}

let tokenEmCache = null;

export async function comTokenDeAdmin() {
  if (!tokenEmCache) {
    const loginResposta = await api()
      .post('/api/auth/login')
      .set('Content-type', 'application/json')
      .send({ 
        email: process.env.ADMIN_EMAIL, 
        senha: process.env.ADMIN_SENHA 
      });
    tokenEmCache = loginResposta.body.token;
  }

  return `Bearer ${tokenEmCache}`;
}