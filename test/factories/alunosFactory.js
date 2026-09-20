import { faker } from '@faker-js/faker';

export function novoAluno() {
    const timeStamp = Date.now();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();


    return {
                nome: `${firstName} ${lastName}`,
                email: `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}.${timeStamp}@testapi.com`,
                matricula: `${timeStamp}`,
                senha: '123456'
        }

}