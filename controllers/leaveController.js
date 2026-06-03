import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";

// Create leave
// POST /api/leaves
export const createLeaves = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({userId: session.userId})
        if(!employee) return res.status(404).json({error: "Employee not found"});
        if(employee.isDeleted){
            return res.status(403).json({
                error: "Your account is deactivated. You cannot apply for leave.",
            })
        }



        const {type, startDate, endDate, reason} = req.body;

        if(!type || !startDate || !endDate || !reason){
            return res.status(400).json({error: "Missing fields"});
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if(new Date(startDate) <= today || new Date(endDate) <= today){
            return res.status(400).json({error: "Leave dates must be in the future"});
        }

        if(new Date(endDate) < new Date(startDate) ){
            return res.status(400).json({error: "End date cannot be before start date"});
        }

        const leave = await LeaveApplication.create({
            employeeId: employee._id,
            type,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            status: "PENDING",
        })

        return res.json({ success: true, data: leave });

    } catch (error) {
        return res.status(500).json({error: "Failed"});
    }
}

// Get leave
// GET /api/leaves
export const getLeaves = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// Update leave status
// PATCH /api/leaves/:id
export const updateLeaveStatus = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}