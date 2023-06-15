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

    static async apiGetStudentByCourse(req, res){
        try{
            const studentsList = await studentDAO.getStudentByCourse(req.params.id)
            res.json(studentsList)
        }catch(e){
            console.error(`apiGetStudentByCourse Error, ${e}`)
            res.json({error : e})
        }
        
    }

    static async apiPostEnrollment(req, res){
        try{
            const student = await studentDAO.postEnrollment(req.body)
        }catch(e){
            console.error(`apiPostEnrollment Error, ${e}`)
            res.json({error : e})
        }

        res.json({status: "success"})
    }
}

module.exports = studentController