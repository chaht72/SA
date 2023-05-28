/**
 * SaqibEstateRoutes.js
 * @description :: CRUD API routes for SaqibEstate
 */

const express = require('express');
const router = express.Router();
const SaqibEstateController = require('../../controller/admin/SaqibEstateController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/saqibestate/me').get(auth(PLATFORM.ADMIN),SaqibEstateController.getLoggedInUserInfo);
router.route('/admin/saqibestate/create').post(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.addSaqibEstate);
router.route('/admin/saqibestate/list').post(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.findAllSaqibEstate);
router.route('/admin/saqibestate/count').post(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.getSaqibEstateCount);
router.route('/admin/saqibestate/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.getSaqibEstate);
router.route('/admin/saqibestate/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.updateSaqibEstate);    
router.route('/admin/saqibestate/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.partialUpdateSaqibEstate);
router.route('/admin/saqibestate/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.softDeleteSaqibEstate);
router.route('/admin/saqibestate/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.softDeleteManySaqibEstate);
router.route('/admin/saqibestate/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.bulkInsertSaqibEstate);
router.route('/admin/saqibestate/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.bulkUpdateSaqibEstate);
router.route('/admin/saqibestate/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.deleteSaqibEstate);
router.route('/admin/saqibestate/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,SaqibEstateController.deleteManySaqibEstate);
router.route('/admin/saqibestate/change-password').put(auth(PLATFORM.ADMIN),SaqibEstateController.changePassword);
router.route('/admin/saqibestate/update-profile').put(auth(PLATFORM.ADMIN),SaqibEstateController.updateProfile);

module.exports = router;
