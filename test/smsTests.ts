import {MailJetSMS, SmsClient, SendSmsData, SmsPostResource, SmsResponse, MailJetEmail, SmsGetResource} from "../types";

const expect = require('chai').expect;
require('dotenv').config();

describe('Output tests', function () {

    describe('Post request tests', function () {

        let mailJet: MailJetSMS;

        beforeEach(() => {
            mailJet = require('node-mailjet');
        });

        it('should send sms', async function () {
            // Arrange
            const connection: SmsClient = mailJet.connect(process.env.MJ_API_TOKEN, {
                url: 'api.mailjet.com', // default is the API url
                version: 'v4', // default is '/v3'
                perform_api_call: false // used for tests. default is true
            });
            // Act
            const smsSend: SmsPostResource = connection.post('sms-send');
            const smsData: SendSmsData = {
                'Text': 'Have a nice SMS flight with Mailjet !',
                'To': '+33600000000',
                'From': 'MJPilot',
            };
            let result: SmsResponse = await smsSend.request(smsData);
            expect(result.body.Text).to.be.equal('Have a nice SMS flight with Mailjet !');
            expect(result.body.To).to.be.equal('+33600000000');
            expect(result.body.From).to.be.equal('MJPilot');
            expect(result.url).to.be.equal('https://api.mailjet.com\\v4\\sms-send');
        });

        it('should export csv', async function () {
            // Arrange
           let connection: SmsClient = mailJet.connect(process.env.MJ_API_TOKEN, {
                url: 'api.mailjet.com', // default is the API url
                version: 'v4', // default is '/v3'
                perform_api_call: false // used for tests. default is true
            });
            // Act
            const smsSend: SmsPostResource = connection.post('sms').action('export');
            let responseBody: SmsResponse = await smsSend.request();
            responseBody = {
                body: {
                    ID: 160883413,
                    Status:
                        {
                            Code: 1,
                            Name: 'PENDING',
                            Description: 'The request is accepted.'
                        },
                    CreationTS: 1554993035
                }
            };
            expect(responseBody.body).to.have.property('ID');
            expect(responseBody.body).to.have.property('Status');
            expect(responseBody.body).to.have.property('CreationTS');
        });
    });


    describe('Get request tests', function () {

        let connection: SmsClient;

        beforeEach(() => {
            // Arrange
            const mailJet: MailJetSMS = require('node-mailjet');
            connection = mailJet.connect(process.env.MJ_API_TOKEN, {
                url: 'api.mailjet.com', // default is the API url
                version: 'v4', // default is '/v3'
                perform_api_call: true // used for tests. default is true
            });
        });

        it('should get all sms', async function () {
            // Act
            const smsSend: SmsGetResource = connection.get('sms');
            let result = await smsSend.request({
                To: '+33600000000'
            });
            console.log(result.body);
        });

        it('should check exported csv', async function () {
            // Arrange
            const mailJet = require('node-mailjet').connect(process.env.MJ_API_TOKEN, {
                url: 'api.mailjet.com', // default is the API url
                version: 'v4', // default is '/v3'
                perform_api_call: true // used for tests. default is true
            });
            // Act
            const smsSend = mailJet.get('sms').action('export').id(160875105);
            let responseBody = await smsSend.request();
            console.log(responseBody.body);
            expect(responseBody.body).to.have.property('ID');
            expect(responseBody.body).to.have.property('Status');
            expect(responseBody.body).to.have.property('CreationTS');
        });
    });
});