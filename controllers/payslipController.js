import Payslip from "../models/Payslip.js";



// Create payslip
// POST /api/payslips
export const createPayslip = async (req, res) => {
    try {
        const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;

        if(!employeeId || !month || !year || !basicSalary){
            return res.status(400).json({error: "Missing fields"});
        }

        const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

        const payslip = await Payslip.create({
            employeeId,
            month: Number(month),
            year: Number(year),
            basicSalary: Number(basicSalary),
            allowances: Number(allowances || 0),
            deductions: Number(deductions || 0),
            netSalary,
        })

        return res.json({success: true, data: payslip});

    } catch (error) {
        return res.status(500).json({error: "Failed" });
    }
}


// Get payslips
// GET /api/payslips
export const getPayslips = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// Get payslip by ID
// GET /api/payslips/:id
export const getPayslipById = async (req, res) => {
    
}