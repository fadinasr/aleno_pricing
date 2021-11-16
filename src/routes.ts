import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as GetAllController from './controllers/GetAllController';
import * as UploadController from './controllers/UploadController';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Get All
router.get('/all', GetAllController.getAllPricingItems);

// Upload CSV
router.post('/uploads/csv', UploadController.uploader);

router.get('/data/all', UploadController.getDataFromFile);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
