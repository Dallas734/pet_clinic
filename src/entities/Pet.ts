import Owner from "./Owner";
import PetType from "./PetType";

interface Pet {
    name: string,
    identificationNumber: string,
    birthdate: Date
    type: PetType,
    owner: Owner
}

export default Pet;

