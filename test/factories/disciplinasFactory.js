import { faker } from '@faker-js/faker';

export function novaDisciplina() {

const timeStamp = Date.now();
const nomeDisciplina = faker.person.jobTitle();

    return {
                nome: `${nomeDisciplina}`,
                codigo: `LP${timeStamp}`,
                cargaHoraria: 50
        }

}