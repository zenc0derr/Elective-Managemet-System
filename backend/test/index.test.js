const index = require("../index")
const {request} = require('supertest')

describe("POST enroll",()=>{
    test("should respond with status 200", async ()=>{
        const response = await request(index).post("/api/student/enroll").send(
            {
                "student_id": "CB.EN.U4CSE20366",
                "wish1": ["19CSE332", "19CSE441"],
                "wish2": ["19ENG230"]
            }
        )

        expect(response.statusCode).toBe(200)
    })
})