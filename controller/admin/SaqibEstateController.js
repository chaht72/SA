/**
 * SaqibEstateController.js
 * @description :: exports action methods for SaqibEstate.
 */

const SaqibEstate = require('../../model/SaqibEstate');
const SaqibEstateSchemaKey = require('../../utils/validation/SaqibEstateValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const auth = require('../../services/auth');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of SaqibEstate in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created SaqibEstate. {status, message, data}
 */ 
const addSaqibEstate = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      SaqibEstateSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdSaqibEstate = await dbService.createOne(SaqibEstate,dataToCreate);
    return  res.success({ data :createdSaqibEstate });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of SaqibEstate in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created SaqibEstates. {status, message, data}
 */
const bulkInsertSaqibEstate = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdSaqibEstate = await dbService.createMany(SaqibEstate,dataToCreate); 
      return  res.success({ data :{ count :createdSaqibEstate.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of SaqibEstate from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found SaqibEstate(s). {status, message, data}
 */
const findAllSaqibEstate = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundSaqibEstate;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      SaqibEstateSchemaKey.findFilterKeys,
      SaqibEstate.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    query.id = { $ne: req.user.id };
    if (dataToFind && dataToFind.isCountOnly){
      foundSaqibEstate = await dbService.count(SaqibEstate, query);
      if (!foundSaqibEstate) {
        return res.recordNotFound();
      } 
      foundSaqibEstate = { totalRecords: foundSaqibEstate };
      return res.success({ data :foundSaqibEstate });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundSaqibEstate = await dbService.paginate( SaqibEstate,query,options);
    if (!foundSaqibEstate){
      return res.recordNotFound();
    }
    return res.success({ data:foundSaqibEstate }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of SaqibEstate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found SaqibEstate. {status, message, data}
 */
const getSaqibEstate = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundSaqibEstate = await dbService.findOne(SaqibEstate,{ id :id });
    if (!foundSaqibEstate){
      return res.recordNotFound();
    }
    return  res.success({ data :foundSaqibEstate });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of SaqibEstate.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getSaqibEstateCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      SaqibEstateSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedSaqibEstate = await dbService.count(SaqibEstate,where);
    if (!countedSaqibEstate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedSaqibEstate } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of SaqibEstate with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated SaqibEstate.
 * @return {Object} : updated SaqibEstate. {status, message, data}
 */
const updateSaqibEstate = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      SaqibEstateSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedSaqibEstate = await dbService.update(SaqibEstate,query,dataToUpdate);
    return  res.success({ data :updatedSaqibEstate }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of SaqibEstate with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated SaqibEstates.
 * @return {Object} : updated SaqibEstates. {status, message, data}
 */
const bulkUpdateSaqibEstate = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedSaqibEstate = await dbService.update(SaqibEstate,filter,dataToUpdate);
    if (!updatedSaqibEstate){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedSaqibEstate.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of SaqibEstate with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated SaqibEstate.
 * @return {Object} : updated SaqibEstate. {status, message, data}
 */
const partialUpdateSaqibEstate = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      SaqibEstateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = {};
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedSaqibEstate = await dbService.update(SaqibEstate, query, dataToUpdate);
    if (!updatedSaqibEstate) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedSaqibEstate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of SaqibEstate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of SaqibEstate.
 * @return {Object} : deactivated SaqibEstate. {status, message, data}
 */
const softDeleteSaqibEstate = async (req, res) => {
  try {
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedSaqibEstate = await deleteDependentService.softDeleteSaqibEstate(query, updateBody);
    if (!updatedSaqibEstate){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedSaqibEstate });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of SaqibEstate from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted SaqibEstate. {status, message, data}
 */
const deleteSaqibEstate = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id: req.params.id };
    query.id.$ne = req.user.id;

    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedSaqibEstate = await deleteDependentService.countSaqibEstate(query);
      if (!countedSaqibEstate){
        return res.recordNotFound();
      }
      return res.success({ data :countedSaqibEstate });
    }
    let deletedSaqibEstate = await deleteDependentService.deleteUser(query);
    if (!deletedSaqibEstate){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedSaqibEstate });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of SaqibEstate in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManySaqibEstate = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                          
    query = {
      'id': {
        $in: dataToDelete.ids,
        $ne: req.user.id
      }
    };
    if (dataToDelete.isWarning){
      let countedSaqibEstate = await deleteDependentService.countSaqibEstate(query);
      if (!countedSaqibEstate) {
        return res.recordNotFound();
      }
      return res.success({ data: countedSaqibEstate });            
    }
    let deletedSaqibEstate = await deleteDependentService.deleteSaqibEstate(query);
    if (!deletedSaqibEstate) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedSaqibEstate });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of SaqibEstate from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of SaqibEstate.
 * @return {Object} : number of deactivated documents of SaqibEstate. {status, message, data}
 */
const softDeleteManySaqibEstate = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    query = {
      'id': {
        $in: dataToUpdate.ids,
        $ne: req.user.id
      }
    };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedSaqibEstate = await deleteDependentService.softDeleteSaqibEstate(query, updateBody);
    if (!updatedSaqibEstate) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedSaqibEstate });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : change password
 * @param {Object} req : request including user credentials.
 * @param {Object} res : response contains updated user record.
 * @return {Object} : updated user record {status, message, data}
 */
const changePassword = async (req, res) => {
  try {
    let params = req.body;
    if (!params.newPassword || !params.oldPassword) {
      return res.validationError();
    }
    let result = await auth.changePassword({
      ...params,
      userId:req.user.id
    });
    if (result.flag){
      return res.failure({ message :result.data });
    }
    return res.success({ message :result.data });
  } catch (error) {
    return res.internalServerError({ data:error.message }); 
  }
};
/**
 * @description : update user profile.
 * @param {Object} req : request including user profile details to update in request body.
 * @param {Object} res : updated user record.
 * @return {Object} : updated user record. {status, message, data}
 */
const updateProfile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id:req.user.id
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      SaqibEstateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    if (data.password) delete data.password;
    if (data.createdAt) delete data.createdAt;
    if (data.updatedAt) delete data.updatedAt;
    if (data.id) delete data.id;
    let result = await dbService.update(SaqibEstate, { id :req.user.id } ,data);
    if (!result){
      return res.recordNotFound();
    }            
    return  res.success({ data :result });
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : get information of logged-in User.
 * @param {Object} req : authentication token is required
 * @param {Object} res : Logged-in user information
 * @return {Object} : Logged-in user information {status, message, data}
 */
const getLoggedInUserInfo = async (req, res) => {
  try {
    const query = {
      id: req.user.id,
      isDeleted: false
    };
    query.isActive = true;
    let result = await dbService.findOne(User,query);
    if (!result) {
      return res.recordNotFound();
    }
    return res.success({ data: result });
  } catch (error){
    return res.internalServerError({ data: error.message });
  }
};

module.exports = {
  addSaqibEstate,
  bulkInsertSaqibEstate,
  findAllSaqibEstate,
  getSaqibEstate,
  getSaqibEstateCount,
  updateSaqibEstate,
  bulkUpdateSaqibEstate,
  partialUpdateSaqibEstate,
  softDeleteSaqibEstate,
  deleteSaqibEstate,
  deleteManySaqibEstate,
  softDeleteManySaqibEstate,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};
