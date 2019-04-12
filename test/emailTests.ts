import {MailJet} from '../types';

const expect = require('chai').expect;
require('dotenv').config();

const mailJet: MailJet.Email.Root = require('node-mailjet');

describe('Output tests', function () {

    const senderMail = 'aneliya@mailjet.com';

    let connection: MailJet.Email.Client;

    beforeEach(() => {
        // Arrange
        connection = mailJet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
    });

    describe('Post request tests', function () {
        it('should send email', async function () {
            // Arrange
            const params: MailJet.Email.SendParams = {
                "Messages": [{
                    "From": {
                        "Email": senderMail,
                        "Name": "Me"
                    },
                    "To": [
                        {
                            "Email": "passenger1@mailjet.com",
                            "Name": "You"
                        }
                    ],
                    "Subject": "My first Mailjet Email!",
                    "TextPart": "Greetings from Mailjet!",
                    "HTMLPart": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">Root</a>!</h3>"
                }],
                "SandboxMode": true,
            };
            // Act
            const mailJetRequest: MailJet.Email.PostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJet.Email.PostResponse> = mailJetRequest.request(params);
            const response: MailJet.Email.PostResponse = await mailJetResponse;
            // Assert
            expect(response.body.Messages.length).to.be.equal(1);
            expect(response.body.Messages[0].Status).to.be.equal('success');
            expect(response.body.Messages[0].To.length).to.be.equal(1);
            expect(response.body.Messages[0].To[0].Email).to.be.equal('passenger1@mailjet.com');
        });

        it('should send email with Cc', async function () {
            // Arrange
            const params: MailJet.Email.SendParams = {
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
                            }
                        ],
                        "Cc": [
                            {
                                "Email": "copilot@mailjet.com",
                                "Name": "Copilot"
                            }
                        ],
                        "Subject": "Your email flight plan!",
                        "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                        "HTMLPart": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3>"
                    }
                ],
                "SandboxMode": true
            };
            // Act
            const mailJetRequest: MailJet.Email.PostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJet.Email.PostResponse> = mailJetRequest.request(params);
            const response: MailJet.Email.PostResponse = await mailJetResponse;
            // Assert
            expect(response.body.Messages.length).to.be.equal(1);
            expect(response.body.Messages[0].Status).to.be.equal('success');
            expect(response.body.Messages[0].To.length).to.be.equal(1);
            expect(response.body.Messages[0].To[0].Email).to.be.equal('passenger1@mailjet.com');
        });

        it('should send email with Cc and Bcc', async function () {
            // Arrange
            const params: MailJet.Email.SendParams = {
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
            };
            // Act
            const mailJetRequest: MailJet.Email.PostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJet.Email.PostResponse> = mailJetRequest.request(params);
            const response: MailJet.Email.PostResponse = await mailJetResponse;
            console.log(response.body);
            // Assert
            expect(response.body.Messages.length).to.be.equal(1);
            expect(response.body.Messages[0].Status).to.be.equal('success');
            expect(response.body.Messages[0].To.length).to.be.equal(1);
            expect(response.body.Messages[0].To[0].Email).to.be.equal('passenger1@mailjet.com');
        });

        it('should send email to multiple users', async function () {
            const params: MailJet.Email.SendParams = {
                "Messages": [{
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
                    "Subject": "Your email flight plan!",
                    "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                    "HTMLPart": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3>"
                }],
                "SandboxMode": true
            };
            // Act
            const mailJetRequest: MailJet.Email.PostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJet.Email.PostResponse> = mailJetRequest.request(params);
            const response: MailJet.Email.PostResponse = await mailJetResponse;
            // Assert
            expect(response.body.Messages.length).to.be.equal(1);
            expect(response.body.Messages[0].Status).to.be.equal('success');
            expect(response.body.Messages[0].To.length).to.be.equal(2);
            expect(response.body.Messages[0].To[0].Email).to.be.equal('passenger1@mailjet.com');
            expect(response.body.Messages[0].To[1].Email).to.be.equal('passenger2@mailjet.com');
        });

        it('should send email with attachments', async function () {
            const params: MailJet.Email.SendParams = {
                "Messages": [{
                    "From": {
                        "Email": "pilot@mailjet.com",
                        "Name": "Mailjet Pilot"
                    },
                    "To": [{
                        "Email": "passenger1@mailjet.com",
                        "Name": "passenger 1"
                    }],
                    "Subject": "Your email flight plan!",
                    "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                    "HTMLPart": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />!",
                    "InlinedAttachments": [{
                        "ContentType": "image/png",
                        "Filename": "logo.png",
                        "ContentID": "id1",
                        "Base64Content": "iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAA7EAAAOxAGVKw4b" +
                            "AAAAB3RJTUUH4wIIChcxurq5eQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAA" +
                            "AAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF" +
                            "1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+" +
                            "D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABV0lEQVQokaXSPWtTYRTA8d9N7k1z" +
                            "m6a+RG2x+FItgpu66uDQxbFurrr5OQQHR9FZnARB3PwSFqooddAStCBoqmLtS9omx+ESUXuDon94tnP+5+1JY" +
                            "m057GyQjZFP+l+S6G2FzlNe3WHtHc2TNI8zOlUUGLxsD1kDyR+EEQE2P/L8Jm/uk6RUc6oZaYM0JxtnpEX9AG" +
                            "PTtM6w7yzVEb61EaSNn4QD3j5m4QabH6hkVFLSUeqHyCeot0ib6BdNVGscPM/hWWr7S4Tw9TUvbpFUitHTnF6" +
                            "XrS+sL7O6VBSausT0FZonSkb+nZUFFm+z8Z5up5Btr1Lby7E5Zq4yPrMrLR263ZV52g+LvfW3iy6PXubUNVrn" +
                            "hqYNF3bmiZ1i1MmLnL7OxIWh4T+IMpYeRNyrRzyZjWg/ioh+aVgZu4WfXxaixbsRve5fiwb8epTo8+kZjSPFf" +
                            "/sHvgNC0/mbjJbxPAAAAABJRU5ErkJggg=="
                    }]
                }],
                "SandboxMode": true
            };
            // Act
            const mailJetRequest: MailJet.Email.PostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJet.Email.PostResponse> = mailJetRequest.request(params);
            const response: MailJet.Email.PostResponse = await mailJetResponse;
            console.log(response.body.Messages);
            // Assert
            expect(response.body.Messages.length).to.be.equal(1);
            expect(response.body.Messages[0].Status).to.be.equal('success');
            expect(response.body.Messages[0].To.length).to.be.equal(2);
            expect(response.body.Messages[0].To[0].Email).to.be.equal('passenger1@mailjet.com');
            expect(response.body.Messages[0].To[1].Email).to.be.equal('passenger2@mailjet.com');
        });

        it('should send sample email without options', async function () {
            // Act
            const mailJetRequest: MailJet.Email.PostResource = connection.post("send");
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "FromEmail": senderMail,
                "FromName": "Mailjet Pilot",
                "Subject": "Your email flight plan!",
                "Text-part": "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
                "Html-part": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!",
                "Recipients": [{"Email": "passenger@mailjet.com"}],
                "SandboxMode": true
            });
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.PostResource = connection.post('sender');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "Email": senderMail
            });
            try {
                const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.PostResource = connection.post('template');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "Name": "First Template"
            });
            try {
                const actualResponse: MailJet.Email.Response = await mailJetResponse;
                const responseBody: any = actualResponse.body;
            } catch (e) {
                // Assert
                expect(e.message).to.contain(expectedMessage);
            }
        });

        it('should add template content', async function () {
            // Act
            const mailJetRequest: MailJet.Email.PostResource = connection.post('template');
            const mailJetPostResource: MailJet.Email.PostResource = mailJetRequest.id('762957');
            const mailJetPostActionResource: MailJet.Email.PostResource = mailJetPostResource.action("detailcontent");
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetPostActionResource.request({
                "Html-part": "<html><body><p>Hello {{var:name}}</p></body></html>",
                "Text-part": "Hello {{var:name}}"
            });
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.PostResource = connection.post('contactslist');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "Name": "myList"
            });
            try {
                const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.GetResource = connection.get('message');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request();
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.GetResource = connection.get('message');
            const mailJetGetResource: MailJet.Email.GetResource = mailJetRequest.id(messageId);
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetGetResource.request();
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get messages by specific recipient email', async function () {
            // Act
            const mailJetRequest: MailJet.Email.GetResource = connection.get('message');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "ContactAlt": "noka@abv.bg"
            });
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.GetResource = connection.get('messagehistory');
            const mailJetGetResource: MailJet.Email.GetResource = mailJetRequest.id(messageId);
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetGetResource.request();
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get statistics', async function () {
            // Act
            const mailJetRequest: MailJet.Email.GetResource = connection.get('statcounters');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "CounterSource": "APIKey",
                "CounterTiming": "Message",
                "CounterResolution": "Lifetime"
            });
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get message statistics by custom ID', async function () {
            // Act
            const mailJetRequest: MailJet.Email.GetResource = connection.get('message');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "CustomID": "ExampleID"
            });
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get all templates', async function () {
            // Act
            const mailJetRequest: MailJet.Email.GetResource = connection.get('template');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request({
                "OwnerType": "user",
                "Limit": 100
            });
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
            const responseBody: any = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });

        it('should get account statistics', async function () {
            // Act
            const mailJetRequest: MailJet.Email.GetResource = connection.get('apikey');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetRequest.request();
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.PutResource = connection.put('contactdata');
            const mailJetResource: MailJet.Email.PutResource = mailJetRequest.id('1934644827');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetResource.request({
                "Data": [
                    {
                        "Name": "Age",
                        "value": 30
                    }
                ]
            });
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
            const mailJetRequest: MailJet.Email.PutResource = connection.put('contact');
            const mailJetResource: MailJet.Email.PutResource = mailJetRequest.id('passenger1@mailjet.com');
            const mailJetResponse: Promise<MailJet.Email.Response> = mailJetResource.request({
                "IsExcludedFromCampaigns": "true"
            });
            try {
                const actualResponse: MailJet.Email.Response = await mailJetResponse;
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
        const mailJetRequest: MailJet.Email.PutResource = connection.put('contact');
        const mailJetResource: MailJet.Email.PutResource = mailJetRequest.id('passenger1@mailjet.com');
        const mailJetResponse: Promise<MailJet.Email.Response> = mailJetResource.request({
            "IsExcludedFromCampaigns": "true"
        });
        try {
            const actualResponse: MailJet.Email.Response = await mailJetResponse;
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