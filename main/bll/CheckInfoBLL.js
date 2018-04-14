const checkInfo=require('../util/ormSequelize').CheckInfo;
const service = require('../util/ormSequelize').Service;
const application = require('../util/ormSequelize').Application;
const demand = require('../util/ormSequelize').Demand;
const otherUser = require('../util/ormSequelize').OtherUser;
const dao = require('../dao/_index');
/**
 * 查询审核者的待审核申请
 * @param checkUserID
 * @param returnList
 */
function getCheckingList(checkUserID,status, returnList)
{
    checkInfo.findAndCountAll
    (
        {
            where: {
                "UserID": checkUserID,
                "status": status
            }
        }
    ).then(
        function(res){
            var list = [];
            var serviceID = -1;
            for(var i = 0; i < res.count; i++){
                serviceID = res.rows[i].dataValues.ServiceID;

                service.findAndCountAll({
                    where:{
                    "ServiceID": serviceID
                    }
                }).then(function (value) {
                    var obj=new Object();
                    obj.serviceId=value.rows[0].dataValues.ServiceID;
                    obj.content=value.rows[0].dataValues.Content;
                    obj.startTime=value.rows[0].dataValues.DemandStartTime;
                    obj.endTime=value.rows[0].dataValues.DemandEndTime;
                    obj.duration=value.rows[0].dataValues.Duration;

                    application.findAndCountAll({
                        where:{
                            "ServiceID": obj.serviceId
                        }
                        }).then(function (res2){
                        obj.volunteerID=res2.rows[0].dataValues.UserID;
                        obj.remark=res2.rows[0].dataValues.Remark;
                        otherUser.findAndCountAll({
                            where:{
                                "UserID": obj.volunteerID
                            }
                        }).then(function (value) {
                            obj.volunteerName=value.rows[0].dataValues.Name
                        })
                    })

                    demand.findAndCountAll({
                        where:{
                            "ServiceID": obj.serviceId
                        }
                        }).then(function (value2) {
                        obj.oldManID=value2.rows[0].dataValues.UserID;
                        otherUser.findAndCountAll({
                            where:{
                                "UserID": obj.oldManID
                            }
                        }).then(function (res4) {
                            obj.oldManName=res4.rows[0].dataValues.Name
                        })
                    })

                    list.push(obj);
                })
            }
            setTimeout(function(){
                console.log(list);
                return returnList(list);
            }, 500);
        }
        // {
        //
        //     var list = [];
        //     for(var i = 0; i < res.count; i++){
        //         var serviceID = res.rows[i].dataValues.ServiceID;
        //         var obj = new Object();
        //         obj.serviceId=serviceID;
        //         service.findAndCountAll({
        //             where:{
        //                 "ServiceID": serviceID
        //             }
        //         }).then(function(res1){
        //
        //             var temp=res1.rows[0].dataValues;
        //             obj.content=temp.Content;
        //             obj.startTime=temp.DemandStartTime;
        //             obj.endTime=temp.DemandEndTime;
        //             obj.duration=temp.Duration;
        //             application.findAndCountAll({
        //                 where:{
        //                     "ServiceID": serviceID
        //                 }
        //             }).then(function (res2) {
        //                 obj.volunteerID=res2.rows[0].dataValues.UserID;
        //                 obj.remark=res2.rows[0].dataValues.Remark;
        //                 otherUser.findAndCountAll({
        //                     where:{
        //                         "UserID": obj.volunteerID
        //                     }
        //                 }).then(function (value) {
        //                     obj.volunteerName=value.rows[0].dataValues.Name
        //                 })
        //             })
        //             demand.findAndCountAll({
        //                 where:{
        //                     "ServiceID": serviceID
        //                 }
        //             }).then(function (value) {
        //                 obj.oldManID=value.rows[0].dataValues.UserID;
        //                 otherUser.findAndCountAll({
        //                     where:{
        //                         "UserID": obj.oldManID
        //                     }
        //                 }).then(function (value) {
        //                     obj.oldManName=value.rows[0].dataValues.Name
        //                     list.push(obj);
        //
        //                 })
        //             })
        //
        //         })
        //     }
        //
        //     console.log("取到审核列表"+list);
        //     return returnList(list);
        //
        // }
    )
}

exports.getCheckingList = getCheckingList;