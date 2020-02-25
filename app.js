const   express     = require('express'),
        app         = express(),
        nodemailer  = require('nodemailer');
        bodyParser  = require('body-parser');

var     port    = process.env.PORT || 3000,
        ip      = process.env.IP;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// Index
app.get('/', (req, res) => {
    res.render('landing');
});

// Contact
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    var mailOpts, stmpTrans;
    // Setup nodemailer transport
    stmpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: process.env.GMAIL_USER,
            pass: process.env.GMAILPW
        }
    });
    // Mail Options
    mailOpts = {
        from: req.body.firstName + req.body.email,
        to: 'tiaanmailbox@gmail.com',
        subject: req.body.email + ' sent a message',
        html:   '<p><strong>Name:</strong> ' + req.body.firstName + " " + req.body.lastName + '</p>\n\n' + 
                ' <p><strong>Email:</strong> ' + req.body.email + '<p>\n\n' +
                ' <p><strong>Message:</strong> ' + req.body.message + '</p>' 
    };

    stmpTrans.sendMail(mailOpts, function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log('mail sent');
        }
        stmpTrans.close();
    });

    res.redirect('/');
    
});

app.get('/price', (req, res) => {
    res.render('price');
});

app.listen(port, ip, () => {
    console.log('Server has started on port: ' + port);
});