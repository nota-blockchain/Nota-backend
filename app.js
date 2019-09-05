const express = require('express');
const session = require('express-session');
const fir.ebase = require('firebase')
const bodyParser = require('body-parser');

const app = express();

var firebase_config = {
    apiKey: '',
    authDomain: '프로젝트이름.firebaseapp.com' 
};
var database = firebase.database();
firebase.initializeApp(firebase_config);

function checklogin(){
    if(req.session.logined) {
        return "login"
    }
}
app.get('/', function(req, res) {
    console.log("hello")
    });
//-----------------signup------------------
app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', function(req, res) {
    var docRef = db.collection('users').doc(signup_id);
    var adddata = docRef.set({
        company: signup_company,
        id: signup_id,
        mail:signup_mail, 
        name:signup_name, 
        phone:signup_phone, 
        pw:hashed_pw, 
        type:signup_type, 
        wallet_addr:walletaddr, 
        wallet_privkey:hashed_walletprivkey
    });
    res.send('signup success')
});
//-----------------login------------------
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    var UserDoc = db.collection('User');
    var queryRef = citiesRef.where('id', '==', req.query.id);
    if(req.body.id == queryRef.id && req.body.pw == queryRef.pw)
     {   console.log("login success")
        req.session.logined = true;
        req.session.user_id = req.body.id;
}
    else if(req.body.id == queryRef.id)
       { console.log("PW wrong")}
    else
       { console.log("login fail")}
});

app.get('/logout', (req, res) => {     
    req.session.destroy();
    res.redirect('/');
    res.render('logout');
  });

