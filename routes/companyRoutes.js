import express from "express";
const router = express.Router();
import {
    getCompanies,
    getCompany,
    insertCompany,
    updateCompany,
    deleteCompany,
} from "../controllers/companyControllers.js";



router.get("/", getCompanies);
router.get("/:id", getCompany);

router.post("/", insertCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;