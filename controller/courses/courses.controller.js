const coursesDAO = require("../../dao/courses/courses.dao");

class signinController {
	static async apiGetCourses(req, res){
        const coursesList = await coursesDAO.getCourses(req)
        res.json(coursesList)
    }
}

module.exports = signinController;
