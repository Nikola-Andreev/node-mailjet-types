const expect = require('chai').expect;
require('dotenv').config();

import {
    MailJetEmail,
    MailJetClient,
    MailJetGetResource,
    MailJetResponse,
    MailJetPostResource,
    MailJetPutResource,
} from '../types';

describe('Output tests', function () {

    const senderMail = 'aneliya@mailjet.com';

    let connection: MailJetClient;

    beforeEach(() => {
        // Arrange
        const mailJet: MailJetEmail = require('node-mailjet');
        connection = mailJet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
    });

    describe('Post request tests', function () {
        it('should send sample email', async function () {
            // Act
            const mailJetRequest: MailJetPostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "Messages": [{
                    "From": {
                        "Email": senderMail,
                        "Name": "Me"
                    },
                    "To": [
                        {
                            "Email": "noka@abv.bg",
                            "Name": "You"
                        }
                    ],
                    "Subject": "My first Mailjet Email!",
                    "TextPart": "Greetings from Mailjet!",
                    "HTMLPart": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">MailJetEmail</a>!</h3>"
                }],
                "SandboxMode": true
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody.Messages.length).to.be.equal(1);
            expect(responseBody.Messages[0].Status).to.be.equal('success');
        });

        it('should send sample email to multiple users', async function () {
            // Act
            const mailJetRequest: MailJetPostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "Messages": [
                    {
                        "From": {
                            "Email": senderMail,
                            "Name": "Mailjet Pilot"
                        },
                        "To": [
                            {
                                "Email": "passenger1@mailjet.com",
                                "Name": "passenger 1"
                            },
                            {
                                "Email": "passenger2@mailjet.com",
                                "Name": "passenger 2"
                            }
                        ],
                        "Cc": [
                            {
                                "Email": "copilot@mailjet.com",
                                "Name": "Copilot"
                            }
                        ],
                        "Bcc": [
                            {
                                "Email": "air-traffic-control@mailjet.com",
                                "Name": "Air traffic control"
                            }
                        ],
                        "Subject": "Your email flight plan!",
                        "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                        "HTMLPart": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3>"
                    }
                ],
                "SandboxMode": true
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody.Messages.length).to.be.equal(1);
            expect(responseBody.Messages[0].Status).to.be.equal('success');
        });

        it('should send sample email without options', async function () {
            // Act
            const mailJetRequest: MailJetPostResource = connection.post("send");
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "FromEmail": senderMail,
                "FromName": "Mailjet Pilot",
                "Subject": "Your email flight plan!",
                "Text-part": "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
                "Html-part": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!",
                "Recipients": [{"Email": "passenger@mailjet.com"}],
                "SandboxMode": true
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody['Sent'].length).to.be.equal(1);
            expect(responseBody['Sent'][0]).to.have.property('Email');
            expect(responseBody['Sent'][0]).to.have.property('MessageID');
        });

        it('should verify sender', async function () {
            // Arrange
            const expectedMessage = `400 MJ18 A Sender resource with value \"${senderMail}\" for Email already exists.`;
            // Act
            const mailJetRequest: MailJetPostResource = connection.post('sender');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "Email": senderMail
            });
            try {
                const actualResponse: MailJetResponse = await mailJetResponse;
                const responseBody: any = actualResponse.body;
            } catch (e) {
                // Assert
                expect(e.message).to.contain(expectedMessage);
            }
        });

        it('should create template', async function () {
            // Arrange
            const expectedMessage = `400 A template with "name": "First Template" already exists.`;
            // Act
            const mailJetRequest: MailJetPostResource = connection.post('template');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "Name": "First Template"
            });
            try {
                const actualResponse: MailJetResponse = await mailJetResponse;
                const responseBody: any = actualResponse.body;
            } catch (e) {
                // Assert
                expect(e.message).to.contain(expectedMessage);
            }
        });

        it('should add template content', async function () {
            // Act
            const mailJetRequest: MailJetPostResource = connection.post('template');
            const mailJetPostResource: MailJetPostResource = mailJetRequest.id('762957');
            const mailJetPostActionResource: MailJetPostResource = mailJetPostResource.action("detailcontent");
            const mailJetResponse: Promise<MailJetResponse> = mailJetPostActionResource.request({
                "Html-part": "<html><body><p>Hello {{var:name}}</p></body></html>",
                "Text-part": "Hello {{var:name}}"
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should create contact list', async function () {
            // Arrange
            const expectedMessage = `400 A contact list with name myList already exists`;
            // Act
            const mailJetRequest: MailJetPostResource = connection.post('contactslist');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "Name": "myList"
            });
            try {
                const actualResponse: MailJetResponse = await mailJetResponse;
                const responseBody: any = actualResponse.body;
                // Assert
                expect(responseBody).to.have.property('Count');
                expect(responseBody).to.have.property('Data');
                expect(responseBody).to.have.property('Total');
            } catch (e) {
                // Assert
                expect(e.message).to.contain(expectedMessage);
            }
        });
    });

    describe('Get request tests', function () {
        it('should get all messages', async function () {
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('message');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request();
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get specific message', async function () {
            // Arrange
            const messageId = '576460753004591401';
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('message');
            const mailJetGetResource: MailJetGetResource = mailJetRequest.id(messageId);
            const mailJetResponse: Promise<MailJetResponse> = mailJetGetResource.request();
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get messages by specific recipient email', async function () {
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('message');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "ContactAlt": "noka@abv.bg"
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get events linked to concrete message', async function () {
            // Arrange
            const messageId = '576460753004591401';
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('messagehistory');
            const mailJetGetResource: MailJetGetResource = mailJetRequest.id(messageId);
            const mailJetResponse: Promise<MailJetResponse> = mailJetGetResource.request();
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get statistics', async function () {
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('statcounters');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "CounterSource": "APIKey",
                "CounterTiming": "Message",
                "CounterResolution": "Lifetime"
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get message statistics by custom ID', async function () {
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('message');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "CustomID": "ExampleID"
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get all templates', async function () {
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('template');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request({
                "OwnerType": "user",
                "Limit": 100
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get account statistics', async function () {
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('apikey');
            const mailJetResponse: Promise<MailJetResponse> = mailJetRequest.request();
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;

            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });
    });

    describe('Put request tests', function () {
        it('should put contact data', async function () {
            // Act
            const mailJetRequest: MailJetPutResource = connection.put('contactdata');
            const mailJetResource: MailJetPutResource = mailJetRequest.id('1934644827');
            const mailJetResponse: Promise<MailJetResponse> = mailJetResource.request({
                "Data": [
                    {
                        "Name": "Age",
                        "value": 30
                    }
                ]
            });
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should put contact to exclusion list', async function () {
            // Arrange
            const expectedMessage = '304 Not Modified';
            // Act
            const mailJetRequest: MailJetPutResource = connection.put('contact');
            const mailJetResource: MailJetPutResource = mailJetRequest.id('passenger1@mailjet.com');
            const mailJetResponse: Promise<MailJetResponse> = mailJetResource.request({
                "IsExcludedFromCampaigns": "true"
            });
            try {
                const actualResponse: MailJetResponse = await mailJetResponse;
                const responseBody: any = actualResponse.body;
                // Assert
                expect(responseBody).to.have.property('Count');
                expect(responseBody).to.have.property('Data');
                expect(responseBody).to.have.property('Total');
            } catch (e) {
                expect(e.message).to.contain(expectedMessage);
            }
        });
    });


    it('should put contact to exclusion list', async function () {
        // 9e5cf796efc746fe840ab6b58689385d
        // Arrange
        const expectedMessage = '304 Not Modified';
        // Act
        const mailJetRequest: MailJetPutResource = connection.put('contact');
        const mailJetResource: MailJetPutResource = mailJetRequest.id('passenger1@mailjet.com');
        const mailJetResponse: Promise<MailJetResponse> = mailJetResource.request({
            "IsExcludedFromCampaigns": "true"
        });
        try {
            const actualResponse: MailJetResponse = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        } catch (e) {
            expect(e.message).to.contain(expectedMessage);
        }
    });
});