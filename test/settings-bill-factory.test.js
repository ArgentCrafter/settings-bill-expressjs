let assert = require('assert');
const moment = require("moment");
let settingsBill = require('../settings-bill-factory');

describe('Settings Bill Factory:', () => {
    it('totals function, correct total is displayed', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');

        assert.deepEqual(SettingsBill.totals(), { callTotal: 20, grandTotal: 25, smsTotal: 5 });
    })
    it('hasReachedWarningLevel function, warning level is not reached', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedWarningLevel(), false);
    })
    it('hasReachedWarningLevel function, warning level is reached', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedWarningLevel(), true);
    })
    it('hasReachedCriticalLevel function, ccritical level is not reached', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedCriticalLevel(), false);
    })
    it('hasReachedCriticalLevel function, critical level is reached', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedCriticalLevel(), true);
    })
    it('actions function, correct cost, type, and timestamp', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        let pointTime = moment();
        SettingsBill.recordAction('sms');

        assert.deepEqual(SettingsBill.actions(), [{  cost: 5,  timestamp: pointTime,  type: 'sms'}]);
    })
})