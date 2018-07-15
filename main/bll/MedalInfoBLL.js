
const medalInfoList = require('../util/ormSequelize').MedalInfoList;
const transactionInfo = require('../blockchain/_index').transactionInfo;

/**
 * 根据老人的ID获取勋章已转移信息
 *  @param UserID
 * @param returnList
 */

function getGiveInfo(UserID,returnList){

    medalInfoList.findAndCountAll({
        where:{
            "oldmanID": UserID,
            "Status": 3
        }
    }).then(function(res){
        return returnList(res);
    })
}

function getGetInfo(UserID,returnList){

    medalInfoList.findAndCountAll({
        where:{
            "volunteerID": UserID,
            "Status": 3
        }
    }).then(function(res){
        return returnList(res);
    })
}
function getTransactionInfo(UserID,transactionHash, callback){
    
    transactionInfo(UserID,transactionHash,(reciept)=>{          
         
        callback(reciept);    
        
        })}
    

exports.getGiveInfo = getGiveInfo;
exports.getGetInfo = getGetInfo;
exports.getTransactionInfo = getTransactionInfo;