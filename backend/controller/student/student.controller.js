const studentDAO = require("../../dao/student/student.dao")

class studentController{
    static async apiGetStudents(req, res){
        const studentsList = await studentDAO.getStudents(req)
        res.json(studentsList)
    }

    static async apiGetEnrollment(req, res){
        const enrollmentData = await studentDAO.getEnrollment(req)
        res.json(enrollmentData)
    }
}

module.exports = studentController