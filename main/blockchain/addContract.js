const config = require('./config');
const Node = require('./gethProcess.js');

function addContract(UserID, UserAddress,ServiceID,updateDB)
{
    let node = new Node(UserID);
  node.start((web3, child) =>{
      let abiDefinition = config.abiDefinition;
      let byteCode = '0x608060405234801561001057600080fd5b5060405160208061062383398101806040528101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060026000018190555060006002600101819055506000600280018190555060006002600301819055506000600260040181905550600060026005018190555050610560806100c36000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063532c27b814610093578063753ec103146100be57806377c936621461010c578063a3ec138d14610163578063ab2e6452146101be578063bfdb629c1461021d578063c08cc02d14610248578063de29278914610273575b600080fd5b34801561009f57600080fd5b506100a86102c6565b6040518082815260200191505060405180910390f35b3480156100ca57600080fd5b506100d36102d3565b60405180878152602001868152602001858152602001848152602001838152602001828152602001965050505050505060405180910390f35b34801561011857600080fd5b506101216102fd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561016f57600080fd5b506101a4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610322565b604051808215151515815260200191505060405180910390f35b3480156101ca57600080fd5b506102076004803603810190808035906020019092919080359060200190929190803590602001909291908035906020019092919050505061034d565b6040518082815260200191505060405180910390f35b34801561022957600080fd5b50610232610436565b6040518082815260200191505060405180910390f35b34801561025457600080fd5b5061025d610442565b6040518082815260200191505060405180910390f35b34801561027f57600080fd5b5061028861044f565b6040518082600460200280838360005b838110156102b3578082015181840152602081019050610298565b5050505090500191505060405180910390f35b6000600260000154905090565b60028060000154908060010154908060020154908060030154908060040154908060050154905086565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016020528060005260406000206000915090508060000160009054906101000a900460ff16905081565b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff161515156103af57600080fd5b60018160000160006101000a81548160ff0219169083151502179055508560028001600082825401925050819055508460026003016000828254019250508190555083600260040160008282540192505081905550826002600501600082825401925050819055506001600260010154016002600101819055506001915050949350505050565b60006002800154905090565b6000600260010154905090565b610457610511565b600260010154600280015481151561046b57fe5b0481600060048110151561047b57fe5b60200201818152505060026001015460026003015481151561049957fe5b048160016004811015156104a957fe5b6020020181815250506002600101546002600401548115156104c757fe5b048160026004811015156104d757fe5b6020020181815250506002600101546002600501548115156104f557fe5b0481600360048110151561050557fe5b60200201818152505090565b6080604051908101604052806004906020820280388339808201915050905050905600a165627a7a72305820be9297306eb2fa5b1818fdf91cc351c3fdc2f616ef24552f9b69f9ec3b43b0770029';
      let contract = new web3.eth.Contract(abiDefinition);
      console.log('start unlock account');
      web3.eth.personal.unlockAccount(UserAddress, '123456', 1000).then((response) => {
          console.log('start deploy contract');
          contract.deploy({
              data: byteCode,
              arguments: [ServiceID]
          })
              .send({
                  from: UserAddress,
                  gas: '0x2fefd8',
                  gasPrice: '18000000000'
              })
              .then(function (newContractInstance) {
                  console.log('contract deployed at:' + newContractInstance.options.address);
                  updateDB(newContractInstance.options.address);
                  setTimeout(() => child.kill(), 1000 * 60 * 5);
              }).catch((err) => {
              console.log(err);
              child.kill();
          })
      })
  })
}

module.exports = addContract;
