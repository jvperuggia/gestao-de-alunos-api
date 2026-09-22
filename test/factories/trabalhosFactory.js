import { faker } from '@faker-js/faker';


export function novoTrabalho() {
const timeStamp = Date.now();
const tituloTrabalho = faker.lorem.paragraph

    return {
             disciplinaId: "disciplina-matematica",
             titulo: `Lista de Exercícios codigo: ${timeStamp}`,
             descricao: `${tituloTrabalho}`
        }

}