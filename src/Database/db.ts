import mongoose from "mongoose";

const db = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb://mongo:ysQ53Ex48NhAiC2n5JfJ@containers-us-west-56.railway.app:7388")
    .then(() => console.log("connected mongodb")).catch((err) => console.log(err))
}

export default db