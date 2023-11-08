import { Request, Response, Router } from "express";
import validateData from "../middlewares/validateData.middleware";
import { pubsSchemaRequest, pubsUpdateSchemaRequest } from "../schemas/pubs.schemas";
import { createPubController, deletePubController, listPubUniqueController, resetPasswordController, sendEmailResetPasswordController, updatePubController, uploadPubController } from "../controllers/pubs.controllers";
import ensureAuthIsValidMiddleware from "../middlewares/ensureAuthIsValid.middleware";
import { ensurePubAccount } from "../middlewares/ensureAccount.middleware";
import { Repository } from "typeorm";
import { Plan } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { plansSchemaResponse } from "../schemas/plans.schemas";

const upload = require('../middlewares/uploadPhoto.middleware')
const pubsRoutes: Router = Router();

pubsRoutes.post('', validateData(pubsSchemaRequest), createPubController)
pubsRoutes.get('', ensureAuthIsValidMiddleware, listPubUniqueController)
pubsRoutes.patch('/:id', ensureAuthIsValidMiddleware, ensurePubAccount, validateData(pubsUpdateSchemaRequest), updatePubController)
pubsRoutes.delete('/:id', ensureAuthIsValidMiddleware, ensurePubAccount, deletePubController)
pubsRoutes.post('/recuperar-senha', sendEmailResetPasswordController)
pubsRoutes.patch('/recuperar-senha/:token', resetPasswordController)
pubsRoutes.patch('/upload/:id', (upload.single('file')), uploadPubController)
pubsRoutes.post('/plan', async (req: Request, res: Response): Promise<Response> => {

    return res.status(201).json({
        message: "ok"
    })
})

export default pubsRoutes
