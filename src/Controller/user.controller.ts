import { Request, Response } from 'express'
import { findAll, create, findId, deleteUserId, loginFind } from '../Services/userService'

export const getAll = async (__: Request, res: Response) => {
    try {
        const user = await findAll()
        if (user.length === 0) return res.status(404).send({ messagem: "Not Users registers" })

        return res.status(200).json({
            messagem: "Sucessfull",
            users: user,
        })
    } catch (err) {
        return res.status(404).send({ messagem: err })
    }
}

export const getId = async (req: Request, res: Response) => {
    try {
        const user = await findId(req.params.id)
        if (!user) return res.status(404).send({ messagem: "This user does not exist" })

        return res.status(200).json({
            messagem: "Sucessfull",
            user: user
        })

    } catch (err) {
        return res.status(404).send({ messagem: err })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const user = await create(req.body)

        if (!user) return res.status(404).send({ messagem: "Fields cannot be empty" })

        return res.status(200).json({
            messagem: "User created sucessfull",
            sucess: {
                user: user._id,
                name,
                email,
                password
            }
        })

    } catch (err) {
        return res.status(404).send({ messagem: err })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { name, password, email } = req.body

        const user: any = await loginFind(email)
        if (!user) return res.status(404).send({ messagem: "This e-mail does not exist" })

        const passwordIsCorrect = await user.checkPassWord(password)
        if (!passwordIsCorrect) return res.status(404).send({ messagem: "Not Found" })

        const token = await user.genereteToken(user._id, name, email)
        if (!token) return res.status(404).send({ messagem: "Not Found" })

        return res.status(200).json({ passwordUser: passwordIsCorrect, token: token })

    } catch (err) {
        return res.status(404).send(err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await deleteUserId(req.params.id)
        if (!user) return res.status(404).send({ messagem: "This user does not exist" })

        return res.status(200).json({
            messagem: "Sucessfull",
            user: user
        })

    } catch (err) {
        return res.status(404).send({ messagem: err })
    }
}