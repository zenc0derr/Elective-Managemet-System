const dayjs = require("dayjs")
const adminDAO = require("../../dao/admin/admin.dao")

class adminController{
    static async apiSetSchedule(req, res){
        try{
            
            const posted = await adminDAO.setSchedule(req.body)
            res.status(200).json(posted)
        }catch(e){
            res.status(500).json({error: e.message})
        }
        
    }

    static async apiGetSchedule(req, res){
        try{
            const result = await adminDAO.getSchedule()
            res.status(200).json(result)
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}

module.exports = adminController;
