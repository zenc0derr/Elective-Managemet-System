const dayjs = require("dayjs")
const adminDAO = require("../../dao/admin/admin.dao")

class adminController{
    static async apiSetSchedule(req, res){
        try{
            
            console.log(dayjs(new Date()))
            const posted = await adminDAO.setSchedule(req.body)
            res.status(200).json({status: "success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
        
    }
}

module.exports = adminController;
