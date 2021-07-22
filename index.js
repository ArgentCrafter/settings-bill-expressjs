const express = require('express');
const exphba = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill-factory');

const app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphba({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals()
    });
});

app.get('/actions', function (req, res) {

    res.render('actions', { actions: settingsBill.actions() });

});

app.get('/actions/:type', function (req, res) {
    const actionType = req.params.type;
    res.render('actions', { actions: settingsBill.actionsFor(actionType) });

});

app.post('/settings', function (req, res) {
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });

    res.redirect('/');
});

app.post('/action', function (req, res) {

    settingsBill.recordAction(req.body.actionType);
    res.redirect('/')
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App started at port: ', PORT);
});