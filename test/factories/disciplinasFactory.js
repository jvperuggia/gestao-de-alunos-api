import { faker } from '@faker-js/faker';

export function novaDisciplina() {

const timeStamp = Date.now();

    return {
                nome: faker.person.jobTitle(),
                codigo: `LP${timeStamp}`,
                cargaHoraria: 50
        }

}