import UserService from "servicios/UserService";

const tieneGrupo = (grupo) => {
    if (UserService.getGroups() != null) {
        return UserService.getGroups().includes(grupo);
    }
    return false;
}

export default tieneGrupo;