import User from "../Models/User";
import { IUser } from "../Types/User";

export const create = (body: IUser) => User.create(body)
export const findId = (_id: string) => User.findById(_id)
export const findAll = () => User.find().sort({_id: -1})
export const deleteUserId = (_id: string) => User.findByIdAndRemove(_id)
export const loginFind = (email: string) => User.findOne({ email: email }).select('+password')