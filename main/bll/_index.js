module.exports.allUserLogin = require('./AllUser').allUserLogin;
module.exports.getUserInfo = require('./AllUser').getUserInfo;
module.exports.userRegister = require('./AllUser').userRegister;
module.exports.getUserIDbyAccount = require('./AllUser').getUserIDbyAccount;
module.exports.volunteerApplicate = require('./OrdinaryUser').volunteerApplicate;
module.exports.noticeOperation=require('./NoticeBLL').noticeOperation;
module.exports.postNewRequirement=require('./DemandBLL').postNewRequirement;
module.exports.getDemandByUserID=require('./DemandBLL').getDemandByUserID;
module.exports.updateDemand=require('./DemandBLL').updateDemand;
module.exports.editDemand = require('./DemandBLL').editDemand;
module.exports.getServicedList=require('./ApplicationBLL').getServicedList;
module.exports.applicate = require('./ApplicationBLL').applicate;
module.exports.applicating = require('./ApplicationBLL').applicating;
module.exports.applicated = require('./ApplicationBLL').applicated;
module.exports.changeUserInformation = require('./OtherUserBLL').changeUserInformation;
module.exports.getOldManName = require('./OtherUserBLL').getOldManName;
module.exports.getAllDemand = require('./DemandBLL').getAllDemand;
module.exports.deleteDemand = require('./DemandBLL').deleteDemand;
module.exports.open = require('./test').open;
module.exports.getDemandByCondition = require('./DemandBLL').getDemandByCondition;
module.exports.getDemandByConditionNoDuration=require('./DemandBLL').getDemandByConditionNoDuration
module.exports.getDemandByConditionNoDurationNoContent=require('./DemandBLL').getDemandByConditionNoDurationNoContent
module.exports.getDemandByConditionNoContent=require('./DemandBLL').getDemandByConditionNoContent
module.exports.applicateInSearch = require('./ApplicationBLL').applicateInSearch;
module.exports.getCheckingList = require('./CheckInfoBLL').getCheckingList;
module.exports.getUserByService = require('./ApplicationBLL').getUserByService;
module.exports.addAdmin = require('./Adminstrator').addAdmin;
module.exports.itemOperation = require('./ServerItemBLL').itemOperation;
module.exports.itemOperationByType = require('./ServerItemBLL').itemOperationByType;
module.exports.checkApplication = require('./CheckInfoBLL').checkApplication;
module.exports.getGiveInfo = require('./MedalInfoBLL').getGiveInfo;
module.exports.getGetInfo = require('./MedalInfoBLL').getGetInfo;
module.exports.getTransactionInfo = require('./MedalInfoBLL').getTransactionInfo;
module.exports.getUserAccount = require('./MedalInfoBLL').getUserAccount;
module.exports.changeNoticeChecked = require('./NoticeBLL').changeNoticeChecked;
module.exports.getServiceType = require('./ServerItemBLL').getServiceType;
module.exports.getMaterial = require('./ApplicationBLL').getMaterial;
module.exports.uploadFile = require('./ApplicationBLL').uploadFile;
module.exports.getCheckNum = require('./ApplicationBLL').getCheckNum;
//管理员端
module.exports.getAllUsers = require('./ForSearch').getAllUsers;
module.exports.ChangeAuthority = require('./ForSearch').ChangeAuthority;
module.exports.getUsersByCondition = require('./ForSearch').getUsersByCondition;
module.exports.postNewNotice = require('./NoticeBLL').postNewNotice;
module.exports.getAllNotice = require('./NoticeBLL').getAllNotice;
module.exports.getOrdinaryUserInfo=require('./OrdinaryUserInfo').getOrdinaryUserInfo;
module.exports.getA_AdminInfo = require('./A_AdminInfo').getA_AdminInfo;
module.exports.getB_AdminInfo = require('./B_AdminInfo').getB_AdminInfo;
module.exports.getUserAddress = require('./AllUser').getUserAddress;