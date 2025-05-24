import express from 'express';
import { singleUpload } from '../middlewares/multer.js';
import { registerCompany, getCompany, getCompanyById, updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
const router = express.Router();

router.post("/register",isAuthenticated, registerCompany)
router.get("/get",isAuthenticated, getCompany)
router.get("/get/:id",isAuthenticated, getCompanyById)  
router.put("/update/:id",isAuthenticated, singleUpload, updateCompany)
export default router;