import { expect } from 'chai';
import { totalPhoneBill } from '../totalPhoneBill.js';

describe('totalPhoneBill', function () {
    
    it('should calculate the total phone bill for one call and one sms', function () {
        const bill = 'call, sms';
        const smsPrice = 0.65;
        const callPrice = 2.75;
        const result = totalPhoneBill(bill, smsPrice, callPrice);
        expect(result).to.equal('R3.40');
    });

    it('should calculate the total phone bill for multiple calls and sms', function () {
        const bill = 'call, call, sms, sms';
        const smsPrice = 0.50;
        const callPrice = 3.00;
        const result = totalPhoneBill(bill, smsPrice, callPrice);
        expect(result).to.equal('R7.00');
    });

    it('should return R0.00 for no calls or sms', function () {
        const bill = '';
        const smsPrice = 0.75;
        const callPrice = 2.50;
        const result = totalPhoneBill(bill, smsPrice, callPrice);
        expect(result).to.equal('R0.00');
    });

    it('should handle a bill with only calls', function () {
        const bill = 'call, call, call';
        const smsPrice = 0.60;
        const callPrice = 3.50;
        const result = totalPhoneBill(bill, smsPrice, callPrice);
        expect(result).to.equal('R10.50');
    });

    it('should handle a bill with only sms', function () {
        const bill = 'sms, sms, sms';
        const smsPrice = 0.25;
        const callPrice = 4.00;
        const result = totalPhoneBill(bill, smsPrice, callPrice);
        expect(result).to.equal('R0.75');
    });
});
