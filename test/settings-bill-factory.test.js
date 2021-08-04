let assert = require('assert');
let settingsBill = require('../settings-bill-factory');

describe('Settings Bill Factory:', () => {
    it('totals function', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');

        assert.deepEqual(SettingsBill.totals(), { callTotal: 20, grandTotal: 25, smsTotal: 5 });
    })
    it('hasReachedWarningLevel function, conditions not met', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedWarningLevel(), false);
    })
    it('hasReachedWarningLevel function, conditions met', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedWarningLevel(), true);
    })
    it('hasReachedCriticalLevel function, conditions not met', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedCriticalLevel(), false);
    })
    it('hasReachedCriticalLevel function, conditions met', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');
        SettingsBill.recordAction('call');

        assert.equal(SettingsBill.hasReachedCriticalLevel(), true);
    })
    it('actions function', () => {
        let SettingsBill = settingsBill();

        SettingsBill.setTestSettings(5, 10, 15, 20);
        SettingsBill.recordAction('sms');

        assert.deepEqual(SettingsBill.actions(), [{  cost: 5,  timestamp: new Date(),  type: 'sms'}]);
    })
})