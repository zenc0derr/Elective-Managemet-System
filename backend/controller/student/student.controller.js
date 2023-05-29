const studentDAO = require("../../dao/student/student.dao")

class studentController{
    static async apiGetStudents(req, res){
        const studentsList = await studentDAO.getStudents(req)
        res.json(studentsList)
    }
}

module.exports = studentController