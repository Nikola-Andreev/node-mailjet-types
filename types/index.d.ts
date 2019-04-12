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
declare namespace SMS {
    // root
    interface MailJet {
        connect(apiToken: string, options?: MailJetConnectOptions): Client;
    }

    // client
    interface Client {
        get(action: string): GetResource,

        post(action: string): PostResource
    }

    // resources
    interface GetResource {
        id(value: string): GetResource,

        action(action: string): GetResourceAction,

        request(params?: GetParams): Promise<GetResponse>,
    }

    interface PostResource {
        action(action: string): PostResource,

        request(params: SendParams): Promise<SendResponse>

        request(params?: ExportParams): Promise<ExportResponse>
    }

    interface GetResourceAction {
        id(value: string): GetResourceActionId

        request(params?: GetParams): Promise<GetResponseAction>
    }

    interface GetResourceActionId {
        request(): Promise<ExportResponse>
    }

    // responses
    interface GetResponse {
        body: GetResponseData
    }

    interface SendResponse {
        body: PostResponseData
        url: string
    }

    interface ExportResponse {
        body: ExportResponseData
    }

    interface GetResponseAction {
        body: GetResponseActionData
    }

    // response data
    interface GetResponseData {
        Data: Array<GetResponseDataData>
    }

    interface PostResponseData {
        From: string
        To: string
        Text: string
        MessageId: string
        SmsCount: number
        CreationTS: number
        SentTS: number
        Cost: ResponseCost
        Status: ResponseStatus
    }

    interface ExportResponseData {
        ID: number
        CreationTS?: number
        ExpirationTS?: number
        Status: ResponseStatus
        URL?: string
        FromTs?: number
        ToTs?: number
    }

    interface GetResponseActionData {
        Count: number
    }

    // response inner data
    interface GetResponseDataData {
        From: string
        To: string
        Status: ResponseStatus
        MessageId: string
        CreationTS: number
        SentTS: number
        SMSCount: number
        Cost: ResponseCost
    }

    interface ResponseStatus {
        Code: number
        Name: string
        Description: string
    }

    interface ResponseCost {
        Value: number
        Currency: string
    }

    // request params
    interface GetParams {
        FromTS?: number
        ToTS?: number
        To?: string
        StatusCode?: Array<number>
        Limit?: number
        Offset?: number
    }

    interface SendParams {
        Text: string
        To: string
        From: string
    }

    interface ExportParams {
        FromTS: number
        ToTS: number
    }
}