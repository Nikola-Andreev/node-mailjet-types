// Type definitions for node-mailjet 3.3.2
// Project: https://github.com/mailjet/mailjet-apiv3-nodejs
// Definitions by: Nikola Andreev <https://github.com/Nikola-Andreev>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface MailJet {
    connect(apiKey: string, apiSecret: string, options?: MailJetConnectOptions): MailJetClient;
}

export interface MailJetConnectOptions {
    readonly proxyUrl: string,
    readonly timeout: number,
    readonly url: string,
    readonly version: string
    readonly perform_api_call: boolean
}

export interface MailJetConfigOptions {
    readonly url?: string,
    readonly version?: string,
    readonly output?: string,
    readonly perform_api_call?: boolean,
    readonly secured?: boolean
}

export interface MailJetClient {
    post(action: string, options?: MailJetConfigOptions): MailJetPostResource,
    get(action: string, options?: MailJetConfigOptions): MailJetGetResource
}

export interface MailJetPostResource {
    request(params: object, callback?: () => void): Promise<MailJetPostResponse>
}

export interface MailJetGetResource {
    id(value: string): MailJetGetResource,
    request(params?: object, callback?: () => void): Promise<MailJetGetResponse>
}

export interface MailJetPostResponse {
    body: MailJetPostResponseBody
}

export interface MailJetGetResponse {
    body: MailJetGetResponseBody
}

export interface MailJetPostResponseBody {
    Messages: [{
        Status: string,
        To: [{
            Email: string,
            MessageID: string,
            MessageHref: string
        }]
    }]
}

export interface MailJetGetResponseBody {
    Count: number,
    Data: Array<object>,
    Total: number
}