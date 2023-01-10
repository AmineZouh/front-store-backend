import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

const tokenSecret = process.env.TOKEN_SECRET as unknown as string


function generate_token(){
    const user = {id:1, first_name:'Mohamed', last_name:'Zouhairi', password:'mohamed123'}
    const token = jwt.sign({user: user}, tokenSecret)
    return token;
}




export default generate_token