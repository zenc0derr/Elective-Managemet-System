const coursesDAO = require("../../dao/courses/courses.dao");

class signinController {
    static async apiGetElective(req, res){
        const coursesList = await coursesDAO.getElective(req)
        res.json(coursesList)
    }
	static async apiGetProfessionalElectives(req, res){
        const coursesList = await coursesDAO.getProfessionalElective(req)
        res.json(coursesList)
    }

    static async apiGetFreeElective(req, res){
        const coursesList = await coursesDAO.getFreeElective(req)
        res.json(coursesList)
    }

    static async apiPostElective(req, res){
        try{
            const courseDetails = {
                name : req.body.name,
                rating : 0,
                credit : req.body.credit,
                faculty : req.body.faculty,
                total_seats : req.body.total_seats,
                remaining_seats : req.body.total_seats,
                duration : req.body.duration,
                venue : req.body.venue,
                description : req.body.description,
                course_id : req.body.course_id,
                image : req.body.image_id,
                type : req.body.type,
                faculty_id : req.body.faculty_id,
                short_form : req.body.short_form,
            }

            const posted = await coursesDAO.PostElective(courseDetails)

            res.json({status: "success"})
        }catch(e) {
            res.status(500).json({error: e.message})
        }
        
    }
}

module.exports = signinController;
