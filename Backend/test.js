import { UserModel } from "./models/user.js";

const user = UserModel.findById(15)

console.log(user);