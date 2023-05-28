/**
 * SaqibEstateRoutes.js
 * @description :: CRUD API routes for SaqibEstate
 */

const express = require('express');
const router = express.Router();
const SaqibEstateController = require('../../../controller/client/v1/SaqibEstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/saqibestate/me').get(auth(PLATFORM.CLIENT),SaqibEstateController.getLoggedInUserInfo);
router.route('/client/api/v1/saqibestate/create').post(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.addSaqibEstate);
router.route('/client/api/v1/saqibestate/list').post(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.findAllSaqibEstate);
router.route('/client/api/v1/saqibestate/count').post(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.getSaqibEstateCount);
router.route('/client/api/v1/saqibestate/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.getSaqibEstate);
router.route('/client/api/v1/saqibestate/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.updateSaqibEstate);    
router.route('/client/api/v1/saqibestate/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.partialUpdateSaqibEstate);
router.route('/client/api/v1/saqibestate/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.softDeleteSaqibEstate);
router.route('/client/api/v1/saqibestate/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.softDeleteManySaqibEstate);
router.route('/client/api/v1/saqibestate/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.bulkInsertSaqibEstate);
router.route('/client/api/v1/saqibestate/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.bulkUpdateSaqibEstate);
router.route('/client/api/v1/saqibestate/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.deleteSaqibEstate);
router.route('/client/api/v1/saqibestate/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,SaqibEstateController.deleteManySaqibEstate);
router.route('/client/api/v1/saqibestate/change-password').put(auth(PLATFORM.CLIENT),SaqibEstateController.changePassword);
router.route('/client/api/v1/saqibestate/update-profile').put(auth(PLATFORM.CLIENT),SaqibEstateController.updateProfile);

module.exports = router;
