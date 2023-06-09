const app = require("./server");
const dotenv = require("dotenv");
const mongodb = require("mongodb");
const signinDAOAdmin = require("./dao/admin/signin.dao");
const signinDAOStudent = require("./dao/student/signin.dao");
const signinDAOFaculty = require("./dao/student/signin.dao");
const coursesDAO = require("./dao/courses/courses.dao")
const studentDAO = require("./dao/student/student.dao")
const adminDAO = require("./dao/admin/admin.dao")

dotenv.config();

const port = process.env.port || 8000;

const Mongoclient = mongodb.MongoClient;

Mongoclient.connect(process.env.DATABASE, {
	maxPoolSize: 50,
	wtimeoutMS: 2500,
	useNewUrlParser: true,
})
	.catch((err) => {
		console.log(err.stack);
		process.exit(1);
	})
	.then(async (client) => {
		await signinDAOAdmin.injectDB(client);
        await signinDAOStudent.injectDB(client);
		await signinDAOFaculty.injectDB(client);
        await coursesDAO.injectDB(client);
        await coursesDAO.injectDBAllocation(client);
		await coursesDAO.injectDBStudent(client)
		await studentDAO.injectDB(client)
		await studentDAO.injectDB2(client)
		await studentDAO.injectDBAllocation(client)

		await adminDAO.injectDB(client);
		await adminDAO.injectDBStudent(client);
		await adminDAO.injectDBCourses(client);

		app.listen(port, () => {
			console.log(`listening on port ${port}`);
		});
	});
