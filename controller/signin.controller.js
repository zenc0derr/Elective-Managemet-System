//const admin = require('../model/admin.model')
const signinDAO = require('../dao/signin.dao')

class signinController {
    static async apiSignIn(req, res) {
        try {
            const admin = await signinDAO.SignIn(req)
            if(admin) {
                return res.json({status: 'ok', user: true})
            }else{
                return res.json({status: 'error', user:false})
            }
        } catch (error) {
            return res.json({status: error})
            console.error(`apiSignIn, ${error}`)
        }
    }
}

module.exports = {signinController}