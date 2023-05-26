const coursesDAO = require("../../dao/courses/courses.dao");

class signinController {
	static async apiGetProfessionalElectives(req, res){
        const coursesList = await coursesDAO.getProfessionalElective(req)
        res.json(coursesList)
    }

    static async apiGetFreeElective(req, res){
        const coursesList = await coursesDAO.getFreeElective(req)
        res.json(coursesList)
    }
}

module.exports = signinController;
