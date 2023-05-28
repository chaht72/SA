/**
 * SaqibEstateRoutes.js
 * @description :: CRUD API routes for SaqibEstate
 */

const express = require('express');
const router = express.Router();
const SaqibEstateController = require('../../../controller/desktop/v1/SaqibEstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/desktop/api/v1/saqibestate/me').get(auth(PLATFORM.DESKTOP),SaqibEstateController.getLoggedInUserInfo);
router.route('/desktop/api/v1/saqibestate/create').post(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.addSaqibEstate);
router.route('/desktop/api/v1/saqibestate/list').post(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.findAllSaqibEstate);
router.route('/desktop/api/v1/saqibestate/count').post(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.getSaqibEstateCount);
router.route('/desktop/api/v1/saqibestate/:id').get(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.getSaqibEstate);
router.route('/desktop/api/v1/saqibestate/update/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.updateSaqibEstate);    
router.route('/desktop/api/v1/saqibestate/partial-update/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.partialUpdateSaqibEstate);
router.route('/desktop/api/v1/saqibestate/softDelete/:id').put(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.softDeleteSaqibEstate);
router.route('/desktop/api/v1/saqibestate/softDeleteMany').put(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.softDeleteManySaqibEstate);
router.route('/desktop/api/v1/saqibestate/addBulk').post(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.bulkInsertSaqibEstate);
router.route('/desktop/api/v1/saqibestate/updateBulk').put(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.bulkUpdateSaqibEstate);
router.route('/desktop/api/v1/saqibestate/delete/:id').delete(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.deleteSaqibEstate);
router.route('/desktop/api/v1/saqibestate/deleteMany').post(auth(PLATFORM.DESKTOP),checkRolePermission,SaqibEstateController.deleteManySaqibEstate);
router.route('/desktop/api/v1/saqibestate/change-password').put(auth(PLATFORM.DESKTOP),SaqibEstateController.changePassword);
router.route('/desktop/api/v1/saqibestate/update-profile').put(auth(PLATFORM.DESKTOP),SaqibEstateController.updateProfile);

module.exports = router;
