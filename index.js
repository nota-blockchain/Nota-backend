const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3();
const app = express();
const filesaver = require('FileSaver');
const cors = require('cors');
const bodyParser = require('body-parser')
const xlsx = require('xlsx');
const request = require('request');
const fs = require('fs');
const ejs = require('ejs');

app.use(cors());
app.use(express.json());

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log(fs.readFileSync('mongo.txt').toString()));
mongoose.connect('mongodb://docker.cloudus.io:32770/mongodb_tutorial', {useNewUrlParser: true});
web3.setProvider(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/3c6820e798874f8ab12d8032821973de'));
var tokenabi = JSON.parse(fs.readFileSync(tokenabi.json)).abi;
var votedappabi = JSON.parse(fs.readFileSync(notaabi.json)).abi;
var tokenAddress = "0x8941aec64f500e52593cdc94fdb997540d65f1e0";
var votedappAddress = "0xbcf6a1cb943c26b5f614d38b4811af4bf6277a79"
var tokencontract = new web3.eth.Contract(tokenabi,tokenAddress)
var votedappcontract = new web3.eth.Contract(votedappabi,votedappAddress)
var transfertoken = function sendeth(privatekey,walletaddr,toaddr,value) { var rawTransaction = {"from": walletaddr,"nonce": web3.toHex(count),"gasPrice": "0x04e3b29200","gasLimit": "0x7458","to": contractAddress,"value": "0x0","data": contract.transfer.getData(toaddr, value, {from: walletaddr}),"chainId": 0x03};var privKey = new Buffer(privatekey, 'hex');var tx = new Tx(rawTransaction); tx.sign(privKey); var serializedTx = tx.serialize(); web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) { if (!err) console.log(hash);else console.log(err);});};
var UserSchema = new Schema({company: String,id: String,pw: String,type: String,name: String,email: String,phone: String,wallet_addr: String,status: String,wallet_privkey: String,description: String,userwhere:String});
var userPaperSchema = new Schema({hash:String,confirmed:Boolean,ownerid:String,sex:String,koreanname:String,englishname:String,birthdate:String,mail:String,phone:String,address:String,school1:{school1_name:String,school1_graduate:String,school1_where:String,school1_graduatedate:String},school2:{school2_name:String,school2_graduate:String,school2_where:String,school2_graduatedate:String},school3:{school3_name:String,school3_graduate:String,school3_where:String,school3_graduatedate:String},school4:{school4_name:String,school4_graduate:String,school4_major:String,school4_where:String,school4_graduatedate:String},work1:{work1_date:String,work1_name:String,work1_position:String,work1_majorwork:String},work2:{work2_date:String,work2_name:String,work2_position:String,work2_majorwork:String},work3:{work3_date:String,work3_name:String,work3_position:String,work3_majorwork:String},army:Boolean,description:String});var eduUserSchema=new Schema({id:String,name:String,paper:String,owner:String,address:String,opendate:String,phone:String,pw:String,confirmed:Boolean});
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
    eduUser.find({confirmed: false}, { pw: 0 , __v:0}, (function(err, users){
        console.log(err);
        if(err) return res.status(500).send({error: 'database failure'});
        if(!eduUser) return res.status(404).json({ error: 'user not found' });
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
    eduUser.remove({ _id: req.query.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        // if(!output.result.n) return res.status(404).json({ error: "user not found" });
        res.json({result: "ok"});
        res.status(204).end();
    })
});

app.get('/admin2', function(req, res){
    UserPaper.find({confirmed: false },{id_:0, confirmed: 0},(function(err, userPaper){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(userPaper);	
}));
});
app.post('/admin2/accept', function(req, res){
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


app.post('/admin3/new', function(req,res){
//NEW DAPP
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
    var paper = new UserPaper();
    paper.hash= req.body.hash,
    paper.confirmed = false,
    paper.ownerid= req.body.ownerid,
    paper.sex=req.body.sex,
    paper.koreanname= req.body.koreanname,
    paper.englishname=req.body.englishname,
    paper.birthdate= req.body.birthdate,
    paper.mail= req.body.mail,
    paper.phone= req.body.phone,
    paper.address= req.body.address,
    paper.school1.school1_name= req.body.school1_name,
    paper.school1.school1_graduate= req.body.school1_graduate,
    paper.school1.school1_where= req.body.school1_where,
    paper.school1.school1_graduatedate= req.body.school1_graduatedate,
    paper.school2.school2_name= req.body.school2_name,
    paper.school2.school2_graduate= req.body.school2_graduate,
    paper.school2.school2_where= req.body.school2_where,
    paper.school2.school2_graduatedate= req.body.school1_graduatedate,
    paper.school3.school3_name=req.body.school3_name,
    paper.school3.school3_graduate=req.body.school3_graduate,
    paper.school3.school3_where=req.body.school3_where,
    paper.school3.school3_graduatedate=req.body.school3_graduatedate,
    paper.school4.school4_name=req.body.school4_name,
    paper.school4.school4_graduate=req.body.school4_graduate,
    paper.school4.school4_major= req.body.school4_major,
    paper.school4.school4_where=req.body.school4_where,
    paper.school4.school4_graduatedate=req.body.school4_graduatedate,
    paper.work1.work1_date=req.body.work1_date,
    paper.work1.work1_name=req.body.work1_name,
    paper.work1.work1_position=req.body.work1_position,
    paper.work1.work1_majorwork=req.body.work1_majorwork,
    paper.work2.work2_date=req.body.work2_date,
    paper.work2.work2_name=req.body.work2_name,
    paper.work2.work2_position=req.body.work2_position,
    paper.work2.work2_majorwork=req.body.work2_majorwork,
    paper.work3.work3_date=req.body.work3_date,
    paper.work3.work3_name=req.body.work3_name,
    paper.work3.work3_position=req.body.work3_position,
    paper.work3.work3_majorwork=req.body.work3_majorwork,
    paper.army=req.body.army,
    paper.description=req.body.description,
    paper.save(function(err){
        if(err){
            console.error(err);
            res.json({result: "error"});
            return res.json({result: "ok"});
    };
    });
    res.status(204).end();
})

app.get('/main1', function(req,res){
    User.find({id: req.query.id}, {_id: 0, __v:0,pw: 0,type: 0,wallet_addr: 0,status: 0,wallet_privkey: 0,description: 0},  function(err, users){
        if(err) return res.status(500).json({error: err});
        if(users.length === 0) return res.status(404).json({error: 'User not found'});
        res.json(users);
    })});

app.get('/main2', function(req,res){
    join.find({userid: req.query.id}, {userid: 0,classname: 1,classid: 1,classorganizer: 1},  function(err, joins){
        if(err) return res.status(500).json({error: err});
        if(joins.length === 0) return res.status(404).json({error: 'joindata not found'});
        res.json(joins);
});
});
app.get('/main2/view', function(req,res){
    classdata.find({classid: req.param.id}, { classid: 1,eduName: 1,description: 0,teacher: 1,organizer: 1,status: 1,date: 1,file: 1,});},  function(err, datas){
if(err) return res.status(500).json({error: err});
        if(datas.length === 0) return res.stwatus(404).json({error: 'data not found'});
        res.json(datas);
});


app.get('/main3', function(req,res){ // 신청
    classdata.find({status: "1"}, {     classid: 1,eduName: 1,description: 1,teacher: 1,organizer: 1,status: 0,date: 1,file: 0,});},  function(err, datas){
if(err) return res.status(500).json({error: err});
        if(datas.length === 0) return res.stwatus(404).json({error: 'data not found'});
        res.json(datas);
});

app.post('/main3/register/', function(req,res){
    var join = new join();
    join.userid=req.query.userid,
    join.classname=req.query.classname,
    join.classid=req.query.classid,
    join.classorganizer=req.query.classorganizer,
join.save(function(err){
    if(err){
        console.error(err);
        res.json({result: "error"});
        return res.json({result: "ok"});
};
});})

app.get('/main4', function(req,res){
//수료증 출력
});

app.get('/talk1', function(req,res){
 // 강연자 투표

 //이름,강연이름,강연정보
})

app.post('/talk2', function(req,res){
    var talkjoin = new talkjoin();
    talkjoin.userid=req.query.userid,
    talkjoin.talkname=req.query.talkname,
    talkjoin.talkid= talk.find({title: talkname}, {_id: 0, __v: 0, talker: 0, title:0, description:0})
    talkjoin.talker=req.query.talker,
    talkjoin.save(function(err){
    if(err){
        console.error(err);
        res.json({result: "error"});
        return res.json({result: "ok"});
};
});
    
   })
app.get('/edu1', function(req,res){

    //
})


app.post('/edu2', function(req,res){
    var classdata = new classdata();
    classdata.classid=req.body.classid,//change
    classdata.eduName=req.body.classname,
    classdata.description=req.body.description,
    classdata.teacher=req.body.teacher,
    classdata.organizer=req.body.organizer,
    classdata.price=req.body.price,
    classdata.status="1"
    classdata.date=req.body.date,
    classdata.corganizerid= req.body.corganizerid
classdata.save(function(err){
    if(err){
        console.error(err);
        res.json({result: "error"});
        return res.json({result: "ok"});
};
})
})
app.get('/edu3', function(req,res){

})
app.post('/validate_corp', function(req,res){

})
// ------------temp------------
app.post('/temp1', function(req,res){
    console.log("temp1")
     var eduuser = new eduUser();
            eduuser.id=req.query.id,
            eduuser.name=req.query.name,
            eduuser.paper=req.query.paper,
            eduuser.owner=req.query.owner,
            eduuser.address=req.query.address,
            eduuser.opendate=req.query.opendate,
            eduuser.phone=req.query.phone,
            eduuser.pw=req.query.pw,
            eduuser.confirmed=false,
        eduuser.save(function(err){
            if(err){
                console.error(err);
                res.json({result: "error"});
                return res.json({result: "ok"});
        };
        });
})

app.post('/temp2', function(req,res){
    console.log('temp2')
    var paper = new UserPaper();
    paper.hash= req.body.hash,
    paper.confirmed = req.body.confirmed,
    paper.ownerid= req.body.ownerid,
    paper.status=req.body.status,
    paper.koreanname= req.body.koreanname,
    paper.englishname=req.body.englishname,
    paper.birthdate= req.body.birthdate,
    paper.mail= req.body.mail,
    paper.phone= req.body.phone,
    paper.address= req.body.address,
    paper.school1.school1_name= req.body.school1_name,
    paper.school1.school1_graduate= req.body.school1_graduate,
    paper.school1.school1_where= req.body.school1_where,
    paper.school1.school1_graduatedate= req.body.school1_graduatedate,
    paper.school2.school2_name= req.body.school2_name,
    paper.school2.school2_graduate= req.body.school2_graduate,
    paper.school2.school2_where= req.body.school2_where,
    paper.school2.school2_graduatedate= req.body.school1_graduatedate,
    paper.school3.school3_name=req.body.school3_name,
    paper.school3.school3_graduate=req.body.school3_graduate,
    paper.school3.school3_major= req.body.school3_major,
    paper.school3.school3_where=req.body.school3_where,
    paper.school3.school3_graduatedate=req.body.school3_graduatedate,
    paper.work1.work1_date=req.body.work1_date,
    paper.work1.work1_name=req.body.work1_name,
    paper.work1.work1_position=req.body.work1_position,
    paper.work1.work1_majorwork=req.body.work1_majorwork,
    paper.work2.work2_date=req.body.work2_date,
    paper.work2.work2_name=req.body.work2_name,
    paper.work2.work2_position=req.body.work2_position,
    paper.work2.work2_majorwork=req.body.work2_majorwork,
    paper.work3.work3_date=req.body.work3_date,
    paper.work3.work3_name=req.body.work3_name,
    paper.work3.work3_position=req.body.work3_position,
    paper.work3.work3_majorwork=req.body.work3_majorwork,
    paper.army=req.body.army,
    paper.description=req.body.description,
    paper.save(function(err){
        if(err){
            console.error(err);
            res.json({result: "error"});
            return res.json({result: "ok"});
    };
    });
    // var workbook = xlsx.readFile('excel_file_01.xlsx');
    // var first_sheet_name = workbook.SheetNames[0];
    // xlsx.utils.sheet_add_json(ws, [{ A: 1, B: 2 }, { A: 2, B: 3 }, { A: 3, B: 4 }], {skipHeader: true, origin: "A2"});
    // xlsx.writeFile(paper, '~/userpaper/'+username+".xlsx");
});

app.get('/pdf', (req, res) => {
    // ejs.renderFile('./templete.ejs', {
    //     kr_username: '엄다니엘',
    //     en_username: 'danieluhm',
    //     birthday_year: '2004',
    //     birthday_month: '11',
    //     birthday_day: '19',
    //     birthday_older: '14',
    //     gender: '남',
    //     home_1: '010',
    //     home_2: '9563',
    //     home_3: '7570',
    //     phone_1: '010',
    //     phone_2: '9563',
    //     phone_3: '7570',
    //     address: '경기도 화성시 동탄청계로 303-13, 1113동 401호(청계동, 신안인스빌 리베라 2차)',
    //     gunin: '아니오',
    //     email: 'danal@cloudus.io',
    //     school1: '하귀일초등학교',
    //     school2: '귀일중학교',
    //     school3: '검정고시',
    //     school4: '고오려사이버대학교',
    //     school1_address: '제주특별자치도',
    //     school2_address: '제주특별자치도',
    //     school3_address: '제주특별자치도',
    //     school4_address: '제주특별자치도',
    //     school1_major: '제주좆',
    //     school2_major: '제주좆',
    //     school3_major: '솔로좆',
    //     school4_major: '경영학과',
    //     school1_start_year: '2011',
    //     school2_start_year: '2011',
    //     school3_start_year: '2011',
    //     school4_start_year: '2011',
    //     school1_start_month: '11',
    //     school2_start_month: '11',
    //     school3_start_month: '11',
    //     school4_start_month: '11',
    //     school1_end_year: '2011',
    //     school2_end_year: '2011',
    //     school3_end_year: '2011',
    //     school4_end_year: '2011',
    //     school1_end_month: '11',
    //     school2_end_month: '11',
    //     school3_end_month: '11',
    //     school4_end_month: '11',
    // }, {}, function(err, str){
    //     if(err) throw err;
    //     res.send(str);
    // });

    if(req.query.download === '') {
        res.setHeader('Content-disposition', 'attachment; filename=nota.pdf');
    }
    return fs.createReadStream('nota-paper.pdf').pipe(res);
});

app.post('/writeresume', function(req,res){
    return res.json({result: "ok"})
});

app.get('/resumeresult', function(req,res){
    return res.json({pdfurl:"https://github.com/cokia", downloadurl:"https://hanukoon.com"})
})

app.get('/vote', function(req,res){
    const peoples = [];
    for(let i = 0; i <= 5; i ++) {
        peoples.push({
            name: '홍길동',
            affiliation: i,
            academicBackground: '하버드 컴공과',
            title: '블록체인 핵심이론',
            article: 'UBS, Credit Suisse, IHS Markit 등 15개 글로벌 금융회사를 대상으로 최종 시스템을 출시하였으며 이번 달 테스트 단계가 끝날 경우 어떤 결과를 가져오고 이어질지 논의하고자 합니다.'
        });
    }
    return res.json(peoples)
    // return res.json({candi1_name:"홍길동",
    // candi1_data:"소속: 삼성전자 연구원\n학력 : 하버드 컴공과\n제목: 블록체인핵심이론\n설명:  ",
    // candi2_name:"홍길동",
    // candi2_data:"소속: 삼성전자 연구원\n학력 : 하버드 컴공과\n제목: 블록체인핵심이론\n설명:  UBS, Credit Suisse, IHS Markit 등 15개 글로벌 금융회사를 대상으로 최종 시스템을 출시하였으며 이번 달 테스트 단계가 끝날 경우 어떤 결과를 가져오고 이어질지 논의하고자 합니다.",
    // candi3_name:"홍길동",
    // candi3_data:"소속: 삼성전자 연구원\n학력 : 하버드 컴공과\n제목: 블록체인핵심이론\n설명:  UBS, Credit Suisse, IHS Markit 등 15개 글로벌 금융회사를 대상으로 최종 시스템을 출시하였으며 이번 달 테스트 단계가 끝날 경우 어떤 결과를 가져오고 이어질지 논의하고자 합니다.",
    // candi4_name:"홍길동",
    // candi4_data:"소속: 삼성전자 연구원\n학력 : 하버드 컴공과\n제목: 블록체인핵심이론\n설명:  UBS, Credit Suisse, IHS Markit 등 15개 글로벌 금융회사를 대상으로 최종 시스템을 출시하였으며 이번 달 테스트 단계가 끝날 경우 어떤 결과를 가져오고 이어질지 논의하고자 합니다.",
    // candi5_name:"홍길동",
    // candi5_data:"소속: 삼성전자 연구원\n학력 : 하버드 컴공과\n제목: 블록체인핵심이론\n설명:  UBS, Credit Suisse, IHS Markit 등 15개 글로벌 금융회사를 대상으로 최종 시스템을 출시하였으며 이번 달 테스트 단계가 끝날 경우 어떤 결과를 가져오고 이어질지 논의하고자 합니다.",
    // })
})
app.post('/vote', function(req,res){
    check = req.query.number;
    return res.json({check: check,})
})

app.get('/voteresult', function(req,res){
    return res.json({candi1:"10%",
    candi2:"20%",
    candi3:"40%",
    candi4:"50%",
    candi5:"60%",
    allvoter:"300",
    etherscan:"https://etherscan.io",})
})
app.listen(3000, function () {
    console.log("하와와!");
    
});
