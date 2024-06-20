import Owner from "./Owner";
import PetType from "./PetType";

interface Pet {
    id: string,
    name: string,
    identificationNumber: string,
    birthdate: Date
    type: PetType,
    owner: Owner
}

export default Pet;

