import Job from "../models/job.model.js";
//admin post karega job
export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, position, experience, companyId } = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId, !experience){
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const job = await Job.findOne({title});
        if(job){
            return res.status(400).json({
                message: "Job already exists",
                success: false,
            });
        }
        const newJob = new Job({
            title, 
            description,
            requirements:requirements.split(","),
            salary:Number(salary), 
            location, 
            jobType, 
            position, 
            company: companyId, 
            userId,
            experienceLevel: experience,
            created_by: userId
        });
        await newJob.save();
        res.status(201).json({
            message: "Job posted successfully",
            success: true,
            newJob
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//students k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }
        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt:-1});
        if(!jobs){
            return res.status(400).json({
                message:"Job no found",
                success:false
            })
        }

        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Job fetched successfully",
            success: true,
            job,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//admin kitne job create kra abhi tk
export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({path:"company"});
        if(!jobs){
            return res.status(404).json({
                message: "Job not found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
