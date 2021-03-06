const config = require('./config.js');
const Web3 = require('web3');
const child = require('child_process');
const fs = require('fs');

function Node(UserID){
    this.id = UserID;
    this.cwd = config.basePath;
    this.rpcport = config.rpcport(UserID);
    this.nodeFile = config.nodeFile(UserID);
    this.host = config.host;
    this.port = config.port(UserID);
    this.initArgs = ['--datadir', config.nodeFile(UserID), 'init', 'genesis.json'];
    this.startArgs = ['--rpc', '--rpcport', this.rpcport, '--datadir', this.nodeFile, '--port', this.port, '--rpcapi', 'eth,web3,personal,net', '--bootnodes', config.baseEnode];
}

Node.prototype.init = function (callback) {
    let child1 = child.spawn('geth', this.initArgs, {cwd: this.cwd});
    child1.on('exit', () => {
        console.log(this.nodeFile + ' successfully created');
        callback();
    });
    child1.on('error', (msg) => {
        console.log('init node error: ' + msg);
    })
};

Node.prototype.start = function (work) {
    let that = this;
    console.log('start node');
    let child1 = child.spawn('geth', that.startArgs);
    let logStream = fs.createWriteStream(this.cwd + '/logs/' + this.id + '.log', {flags: 'a'});
    child1.stderr.pipe(logStream);

    let url = that.host + ':' + that.rpcport;
    setTimeout(function () {
        let web3 = new Web3(new Web3.providers.HttpProvider(url));
        web3.eth.getAccounts(console.log);
        console.log('web3 connect to geth');
        work(web3, child1);
    }, 80 * 1000);
};

Node.prototype.getSuperWeb3 = function () {
    let url = this.host + ':' + 8501;
    let web3 = new Web3(new Web3.providers.HttpProvider(url));
    console.log('web3 connect to ' + url);
    return web3;
};

module.exports = Node;