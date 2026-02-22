import express from "express"
import { Router } from "express"
import {downloadMedia} from "../controllers/userController.js"

const router = Router()

router.post("/video", downloadMedia)

export default router 