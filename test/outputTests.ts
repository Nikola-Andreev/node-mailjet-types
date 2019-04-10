const expect = require('chai').expect;
require('dotenv').config();

import {
    MailJet,
    MailJetClient,
    MailJetGetResource, MailJetGetResponse, MailJetGetResponseBody,
    MailJetPostResource,
    MailJetPostResponse,
    MailJetPostResponseBody
} from "../types";

describe('Output tests', function () {

    let connection: MailJetClient;

    beforeEach(() => {
        // Arrange
        const mailJet: MailJet = require('node-mailjet');
        connection = mailJet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
    });

    describe('Send email tests', function () {
        it('should send sample email', async function () {
            // Act
            const mailJetRequest: MailJetPostResource = connection.post("send", {'version': 'v3.1'});
            const mailJetResponse: Promise<MailJetPostResponse> = mailJetRequest.request({
                "Messages": [{
                    "From": {
                        "Email": "n.andreev@proxiad.com",
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
                    "HTMLPart": "<h3>Welcome to <a href=\"https://www.mailjet.com/\">MailJet</a>!</h3>"
                }]
            });
            const actualResponse: MailJetPostResponse = await mailJetResponse;
            const responseBody: MailJetPostResponseBody = actualResponse.body;
            // Assert
            expect(responseBody.Messages.length).to.be.equal(1);
            expect(responseBody.Messages[0].Status).to.be.equal('success');
        });
    });

    describe('Get email messages tests', function () {
        it('should get all messages', async function () {
            // Act
            const mailJetRequest: MailJetGetResource = connection.get('message');
            const mailJetResponse: Promise<MailJetGetResponse> = mailJetRequest.request();
            const actualResponse: MailJetGetResponse = await mailJetResponse;
            const responseBody: MailJetGetResponseBody = actualResponse.body;
            // Assert
            expect(responseBody).to.have.property('Count');
            expect(responseBody).to.have.property('Data');
            expect(responseBody).to.have.property('Total');
        });
    });
});