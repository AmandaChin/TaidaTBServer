const Node = require('./gethProcess');
const config = require('./config');

function checkNum(userID, contractHash,callback) {


    let node = new Node(userID);
    let web3 = node.getSuperWeb3();
    let contract = new web3.eth.Contract(config.abiDefinition, contractHash);
    contract.methods.getProposalCount().call().then(function (result) {
        callback(result);
        console.log("已审核人数" + result);
    });

}

function checkMedal(userID,contractHash,callback){
    let node = new Node(userID);
    let web3 = node.getSuperWeb3();
    let contract = new web3.eth.Contract(config.abiDefinition, contractHash);
    contract.methods.getResult().call().then(function(scoreList)  {
        console.log(scoreList);
        let sum = 0;
        for (let i = 0; i < scoreList.length; i++) {
            sum += parseInt(scoreList[i]);
        }
        let score = sum / scoreList.length;
        console.log('当前得分情况:' + score);
        callback(score*0.1);
    });
}

exports.checkNum = checkNum;
exports.checkMedal = checkMedal;
