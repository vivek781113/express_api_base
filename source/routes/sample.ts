import express from 'express';
import controller from '../controllers/sample';
import middleware from '../middleware';

const router = express.Router();


router.get('/ping', controller.sampleHealthCheck);
router.get('/fetch', middleware.auth, controller.fetchData);
router.get('/keygen', controller.genAPIKey);

export = router;