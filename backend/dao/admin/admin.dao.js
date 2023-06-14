const mongodb = require("mongodb");

let allocation

class adminDAO{
    static async injectDB(conn){
        if(allocation){
            return
        }

        try {
            allocation = await conn.db(process.env.DATABASE_NAME).collection("allocation")
        } catch (e) {
            console.error(
                `unable to connect with course_catalogue, ${e}`
            )
        }
    }

    static async setSchedule({start_time, end_time}){
        try{
            console.log(new Date(start_time)<new Date(end_time))
            const schedule = {allocation_id: 1, start_time: new Date(start_time), end_time: new Date(end_time)}
            const res = await allocation.updateOne(
                {allocation_id: 1},
                {$set: schedule})

            return res
        }catch(e){
            console.error(`Unable to setSchedule: ${e}`)
            return { error: e }
        }
    }
}

module.exports = adminDAO