import UserService from "servicios/UserService";

const RenderGroup = (grupo) => {
    if (UserService.getGroups() != null) {
        return UserService.getGroups().includes(grupo);
    }
    return false;
}

export default RenderGroup;