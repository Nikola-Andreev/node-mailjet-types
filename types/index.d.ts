// Type definitions for node-mailjet 3.3.2
// Project: https://github.com/mailjet/mailjet-apiv3-nodejs
// Definitions by: Nikola Andreev <https://github.com/Nikola-Andreev>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


// ***** Email Api interfaces ***** //

export interface MailJetEmail {
    connect(apiKey: string, apiSecret: string, options?: MailJetConnectOptions): MailJetClient;
}

export interface MailJetConnectOptions {
    readonly proxyUrl?: string,
    readonly timeout?: number,
    readonly url?: string,
    readonly version?: string
    readonly perform_api_call?: boolean
}

export interface MailJetConfigOptions {
    readonly url?: string,
    readonly version?: string,
    readonly output?: string,
    readonly perform_api_call?: boolean,
    readonly secured?: boolean
}

export interface MailJetClient {
    get(action: string): MailJetGetResource,

    put(action: string): MailJetPutResource,

    post(action: string, options?: MailJetConfigOptions): MailJetPostResource
}

export interface MailJetPostResource {
    id(value: string): MailJetPostResource,

    action(action: string): MailJetPostResource,

    request(params: object, callback?: () => void): Promise<MailJetResponse>
}

export interface MailJetGetResource {
    id(value: string): MailJetGetResource,

    action(action: string): MailJetGetResource,

    request(params?: object, callback?: () => void): Promise<MailJetResponse>
}

export interface MailJetPutResource {
    id(value: string): MailJetPutResource,

    request(params: object, callback?: () => void): Promise<MailJetResponse>
}

export interface MailJetResponse {
    readonly body: any
}

// export interface MailJetPostResponseBody {
//     Messages: [{
//         Status: string,
//         To: [{
//             Email: string,
//             MessageID: string,
//             MessageHref: string
//         }]
//     }]
// }
//
// export interface MailJetPostResponseBody2 {
//     Sent: [{
//         Email: string,
//         MessageID: string
//     }]
// }

// export interface MailJetGetResponseBody {
//     readonly Count: number,
//     readonly Data: Array<object>,
//     readonly Total: number
// }


// ***** SMS Api interfaces ***** //

export interface MailJetSMS {
    connect(apiToken: string, options?: MailJetConnectOptions): SmsClient;
}

export interface SmsClient {
    get(action: string): SmsGetResource,

    post(action: string): SmsPostResource
}

export interface SmsPostResource {
    action(action: string): SmsPostResource,

    request(params?: object, callback?: () => void): Promise<SmsResponse>
}

export interface SmsGetResource {
    id(value: string): SmsGetResource,

    action(action: string): SmsGetResource,

    request(params: object, callback?: () => void): Promise<SmsResponse>
}

export interface SmsResponse {
    body: any,
    url?: string
}

export interface SendSmsData {
    Text: string,
    To: string,
    From: string
}