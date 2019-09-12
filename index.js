const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3();
const app = express();
const cors = require('cors');
const corsOptions = {origin: true,credentials: true};
const request = require('request');

app.use(cors(corsOptions));
app.use(express.json());

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log(fs.readFileSync('mongo.txt').toString()));
mongoose.connect('mongodb://docker.cloudus.io:32770/notatest', {useNewUrlParser: true});
web3.setProvider(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3c6820e798874f8ab12d8032821973de'));
var abi = [{"constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "who", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }];
var contractAddress = "0x05e12955059a98b0da00cdb26cbea62e766cc0e8";
var tokencontract = new web3.eth.Contract(abi,contractAddress)
var transfertoken = function sendeth(privatekey,walletaddr,toaddr,value) { var rawTransaction = {"from": walletaddr,"nonce": web3.toHex(count),"gasPrice": "0x04e3b29200","gasLimit": "0x7458","to": contractAddress,"value": "0x0","data": contract.transfer.getData(toaddr, value, {from: walletaddr}),"chainId": 0x03};var privKey = new Buffer(privatekey, 'hex');var tx = new Tx(rawTransaction); tx.sign(privKey); var serializedTx = tx.serialize(); web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) { if (!err) console.log(hash);else console.log(err);});};
var checklogin = function checklogin(){if(!req.session && req.session.logined) {return "login" }}
var isAuth = (req, res, next) => {if(!req.session && req.session.logined) {return next();}};
var UserSchema = new Schema({company: String,id: String,pw: String,type: String,name: String,email: String,phone: String,wallet_addr: String,status: String,wallet_privkey: String,description: String,userwhere:String});
var userPaperSchema = new Schema({hash: String,ownerid: String,address: String,data: String,paper: String,memo: String,id: String,confirmed: String});
var eduUserSchema = new Schema({id: String,name: String,paper: String,owner: String,address: String,opendate: String,phone: String,pw: String,confirmed: Boolean})
var tempSchema = new Schema({dapptransaction: "String"});
var classdataSchema = new Schema({eduName:String,description:String,teacher:String, organizer:String,status:String});
var joinSchema = new Schema({userid:String,classname:String,classid:String,classorganizer:String});
var User = mongoose.model('User', UserSchema);
var UserPaper = mongoose.model('UserPaper', userPaperSchema);
var eduUser = mongoose.model('eduUser', eduUserSchema);
var temp = mongoose.model('temp',tempSchema);
var classdata = mongoose.model('classdata',classdataSchema);
var join = mongoose.model('join',joinSchema);
app.get('/', function(req, res) {
    console.log("hello")    
    });
// -----------------signup------------------
// app.get('/signup', function(req, res) {
//     res.render('signup');
// });

app.post('/signup', function(req, res) {
    createWallet = cb => {
        cb(web3.eth.accounts.create());
      };
      createWallet(result => {
        walletaddr = result.address;
        privkey = result.privateKey;
      });
        var user = new User();
        user.company=req.query.company,
        user.id=req.query.id,
        user.mail=req.query.mail,
        user.name=req.query.name,
        user.phone=req.query.phone,
        user.pw=req.query.pw,
        user.type=req.query.type,
        user.wallet_addr=walletaddr, 
        user.wallet_privkey=privkey,
        user.save(function(err){
            if(err){
                console.error(err);
                res.json({result: "error"});
                return res.json({result: "ok"});
        };
        });
    });
//-----------------login------------------
// app.get('/login', function(req, res) {
//     res.render('login.html');
    	
// });

app.post('/login', function(req, res) {
    // User.find({id: req.params.id}, {_id: 0, title: 1, published_date: 1},  function(err, books){
    if(req.query.id === queryRef.id && req.query.pw === queryRef.pw)
     {   console.log("login success")
        req.session.logined = true;
        req.session.user_id = req.query.id;
}
    else if(req.query.id === queryRef.id)
       { console.log("PW wrong")}
    else
       { console.log("login fail")}
    	
});
//-------------admin----------------
// app.get('/admin', function(req, res){
//     if(!req.session && req.session.logined === true && req.session.user_id === admin){
//         res.render('admin_main.html');
//     } else if (req.session.logined === true && req.session.user_id !== admin){
//         res.send("You are not a admin");
//     } else {
//         res.send("not logined!");
//     }
    	
// });
app.get('/admin1', function(req, res){
    eduUser.find({confirmed: false },{_id:1 ,id: 1,name: 1,paper: 1,owner: 1,address: 1,opendate: 1,phone: 1,pw: 0},(function(err, users){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(users);	
}));
});
app.post('/admin1/accept', function(req,res){
    eduUser.findById(req.query.id, function(err, eduUser){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!eduUser) return res.status(404).json({ error: 'user not found' });
        eduUser.confirmed = true;
        eduUser.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({result: "ok"});
    });
    });
});
    app.post('/admin1/denied', function(req,res){
    eduUser.remove({ id: req.query.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        if(!output.result.n) return res.status(404).json({ error: "user not found" });
        res.json({result: "ok"});
        res.status(204).end();
    })
});

app.get('/admin2', function(req, res){
    UserPaper.find({confirmed: false },{id_:1,owner: 1,address: 1,hash: 1, data: 1,paper: 1,memo: 1,id: 1,confirmed: 0},(function(err, userPaper){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(userPaper);	
}));
});
app.post('/admin2/accpet', function(req, res){
    UserPaper.findById(req.query.id, function(err, UserPaper){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!UserPaper) return res.status(404).json({ error: 'userpaper is not found' });
        UserPaper.confirmed = true;
        UserPaper.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({result: "ok"});
    });
});
});
app.post('/admin2/denied', function(req,res){
    UserPaper.remove({id : req.query.id} , function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    });
});

app.get('/admin3', function(req,res){
    temp.find(function(err, temps){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(temps);
    });
});

app.get('/admin3/<txid>', function(req,res){
    //dapp result print
    });

app.get('/admin3', function(req,res){
//dapp result print
});

app.post('/admin3/new', function(req,res){
req.query.
});

app.get('/admin4', function(req, res){
//token add , burn , value,transfer_from
});

app.get('/admin4/1', function(req, res){
    reqaddr = req.query.reqaddr;
    // console.log(reqaddr);
    balance = tokencontract.methods.balanceOf(reqaddr).call() .then(function (result) {
        var tokensWei = result;
        tokensWei = tokensWei / 1e18
        res.send(String(tokensWei))
        });
    });
    // console.log(balance);
    // res.send(balance);

app.post('/admin4/2', function(req, res){
        reqaddr = req.query.reqaddr;
        amount = req.query.reqaddr;
        res.send(tokencontract.methods.transfer(reqaddr,amount*1e18).call())
    });
app.post('/admin4/3', function(req, res){
    request('https://api.bloxy.info/token/token_holders_list?token='+contractAddress+'&limit=30&key=ACCIzMdEWIDW2&format=structure', function (error, response, body) {
    var a = JSON.parse(body)    
    delete a.annotation;
    delete a.address_type;
    res.send(a);
});
});

//-------------main----------------
app.post('/main1', function(req,res){
    var paper = new userPaper();
    paper.hash=req.body.hash,
    paper.ownerid=req.body.ownerid,
    paper.address=req.body.address,

    var userPaperSchema = new Schema({hash: String,ownerid: String,address: String, school1: String,school2: String,school3: String,school4: String,data: String,memo: String,id: String,confirmed: String});
})



app.listen(3000, function () {
    console.log("하와와!");
});