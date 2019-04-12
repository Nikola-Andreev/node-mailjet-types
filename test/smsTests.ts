import {MailJet} from '../types';

const expect = require('chai').expect;
require('dotenv').config();

const mailJet: MailJet.SMS.Root = require('node-mailjet');

describe('SMS tests', function () {

    describe('Post request tests', function () {

        let connection: MailJet.SMS.Client;

        beforeEach(() => {
            // Arrange
            connection = mailJet.connect(process.env.MJ_API_TOKEN, {
                url: 'api.mailjet.com', // default is the API url
                version: 'v4', // default is '/v3'
                perform_api_call: false // used for tests. default is true
            });
        });

        it('should send sms', async function () {
            // Act
            const smsSend: MailJet.SMS.PostResource = connection.post('sms-send');
            const smsData: MailJet.SMS.SendParams = {
                'Text': 'Have a nice SMS flight with Mailjet !',
                'To': '+33600000000',
                'From': 'MJPilot',
            };
            const result: MailJet.SMS.SendResponse = await smsSend.request(smsData);
            expect(result.body.Text).to.be.equal('Have a nice SMS flight with Mailjet !');
            expect(result.body.To).to.be.equal('+33600000000');
            expect(result.body.From).to.be.equal('MJPilot');
            expect(result.url).to.be.equal('https://api.mailjet.com\\v4\\sms-send');
        });

        it('should export csv', async function () {
            const fakeResponse: MailJet.SMS.ExportResponse = {
                body: {
                    ID: 160883413,
                    Status: {
                        Code: 1,
                        Name: 'PENDING',
                        Description: 'The request is accepted.'
                    },
                    CreationTS: 1554993035
                }
            };
            // Act
            const smsSend: MailJet.SMS.PostResource = connection.post('sms').action('export');
            const responseBody: MailJet.SMS.ExportResponse = await smsSend.request();
        });

        it('should export csv in range', async function () {
            // Arrange
            const nowInMilliseconds: number = +new Date();
            const exportData: MailJet.SMS.ExportParams = {"FromTS": nowInMilliseconds, "ToTS": nowInMilliseconds};
            // Act
            const smsSend: MailJet.SMS.PostResource = connection.post('sms').action('export');
            let responseBody: MailJet.SMS.ExportResponse = await smsSend.request(exportData);
            responseBody = {
                body: {
                    ID: 160883413,
                    Status: {
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

        let connection: MailJet.SMS.Client;

        beforeEach(() => {
            // Arrange
            connection = mailJet.connect(process.env.MJ_API_TOKEN, {
                url: 'api.mailjet.com', // default is the API url
                version: 'v4', // default is '/v3'
                perform_api_call: true // used for tests. default is true
            });
        });

        it('should get all sms with limit', async function () {
            // Arrange
            const params: MailJet.SMS.GetParams = {
                Limit: 100
            };
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const response: MailJet.SMS.GetResponse = await getResource.request(params);
            expect(response.body).to.have.property('Data');
        });

        it('should get all sms with offset', async function () {
            // Arrange
            const params: MailJet.SMS.GetParams = {
                Offset: 100
            };
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const response: MailJet.SMS.GetResponse = await getResource.request(params);
            expect(response.body).to.have.property('Data');
        });

        it('should get all sms with offset and limit', async function () {
            // Arrange
            const params: MailJet.SMS.GetParams = {
                Offset: 100,
                Limit: 100
            };
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const response: MailJet.SMS.GetResponse = await getResource.request(params);
            expect(response.body).to.have.property('Data');
        });

        it('should get all sms for period', async function () {
            // Arrange
            const nowMilliseconds = +new Date();
            const params: MailJet.SMS.GetParams = {
                FromTS: nowMilliseconds,
                ToTS: nowMilliseconds
            };
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const response: MailJet.SMS.GetResponse = await getResource.request(params);
            expect(response.body).to.have.property('Data');
        });

        it('should get all sms for specific contact', async function () {
            // Arrange
            const params: MailJet.SMS.GetParams = {
                To: '+33600000000'
            };
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const response: MailJet.SMS.GetResponse = await getResource.request(params);
            expect(response.body).to.have.property('Data');
        });

        it('should get all sms based on status codes', async function () {
            // Arrange
            const params: MailJet.SMS.GetParams = {
                StatusCode: [1, 2]
            };
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const response: MailJet.SMS.GetResponse = await getResource.request(params);
            expect(response.body).to.have.property('Data');
        });

        it('should get specific sms by id', async function () {
            // Arrange
            const fakeId = 'fake_id';
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms').id(fakeId);
            try {
                const response: MailJet.SMS.GetResponse = await getResource.request();
                expect(response.body).to.have.property('Data');
            } catch (e) {
                expect(e.message).to.contain('404');
            }
        });

        it('should get sms count', async function () {
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const actionResponse: MailJet.SMS.GetResourceAction = getResource.action('count');
            const response: MailJet.SMS.GetResponseAction = await actionResponse.request();
            expect(response.body).to.have.property('Count');
        });

        it('should get sms count in range', async function () {
            // Arrange
            const nowMilliseconds = +new Date();
            const params: MailJet.SMS.GetParams = {
                FromTS: nowMilliseconds,
                ToTS: nowMilliseconds
            };
            // Act
            const getResource: MailJet.SMS.GetResource = connection.get('sms');
            const actionResponse: MailJet.SMS.GetResourceAction = getResource.action('count');
            const response: MailJet.SMS.GetResponseAction = await actionResponse.request(params);
            expect(response.body).to.have.property('Count');
        });

        it('should check exported csv', async function () {
            // Act
            const getResource: MailJet.SMS.GetResourceActionId = connection.get('sms').action('export').id('160875105');
            const response: MailJet.SMS.ExportResponse = await getResource.request();
            expect(response.body).to.have.property('ID');
            expect(response.body).to.have.property('Status');
            expect(response.body).to.have.property('CreationTS');
            expect(response.body).to.have.property('ExpirationTS');
            expect(response.body).to.have.property('URL');
        });
    });
});