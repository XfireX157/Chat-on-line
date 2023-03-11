import { Router } from "express";
import {getAll, getId ,createUser, deleteUser, login} from '../Controller/user.controller'

const user = Router()

user
    .get("/getUsers", getAll)
    .get("/getUser/:id", getId)
    .post("/loginUser", login)
    .post("/registerUser", createUser)
    .delete("/deleteUser/:id", deleteUser)

export default user