import User from "../models/user.model.js";
import Manager from "./manager.js";

const usersManager = new Manager(User)
export default usersManager
// const { create, read, readById, readByEmail, update, destroy } = usersManager

// export { create, read, readById, readByEmail, update, destroy }