/**
 * SaqibEstateRoutes.js
 * @description :: CRUD API routes for SaqibEstate
 */

const express = require('express');
const router = express.Router();
const SaqibEstateController = require('../../../controller/device/v1/SaqibEstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/saqibestate/me').get(auth(PLATFORM.DEVICE),SaqibEstateController.getLoggedInUserInfo);
router.route('/device/api/v1/saqibestate/create').post(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.addSaqibEstate);
router.route('/device/api/v1/saqibestate/list').post(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.findAllSaqibEstate);
router.route('/device/api/v1/saqibestate/count').post(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.getSaqibEstateCount);
router.route('/device/api/v1/saqibestate/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.getSaqibEstate);
router.route('/device/api/v1/saqibestate/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.updateSaqibEstate);    
router.route('/device/api/v1/saqibestate/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.partialUpdateSaqibEstate);
router.route('/device/api/v1/saqibestate/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.softDeleteSaqibEstate);
router.route('/device/api/v1/saqibestate/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.softDeleteManySaqibEstate);
router.route('/device/api/v1/saqibestate/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.bulkInsertSaqibEstate);
router.route('/device/api/v1/saqibestate/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.bulkUpdateSaqibEstate);
router.route('/device/api/v1/saqibestate/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.deleteSaqibEstate);
router.route('/device/api/v1/saqibestate/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,SaqibEstateController.deleteManySaqibEstate);
router.route('/device/api/v1/saqibestate/change-password').put(auth(PLATFORM.DEVICE),SaqibEstateController.changePassword);
router.route('/device/api/v1/saqibestate/update-profile').put(auth(PLATFORM.DEVICE),SaqibEstateController.updateProfile);

module.exports = router;
