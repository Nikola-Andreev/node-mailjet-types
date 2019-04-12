// Type definitions for node-mailjet 3.3.2
// Project: https://github.com/mailjet/mailjet-apiv3-nodejs
// Definitions by: Nikola Andreev <https://github.com/Nikola-Andreev>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


export module MailJet {

    interface ConnectOptions {
        readonly proxyUrl?: string
        readonly timeout?: number
        readonly url?: string
        readonly version?: string
        readonly perform_api_call?: boolean
    }

    interface ConfigOptions {
        readonly url?: string
        readonly version?: string
        readonly output?: string
        readonly perform_api_call?: boolean
        readonly secured?: boolean
    }

    namespace Email {

        interface Root {
            connect(apiKey: string, apiSecret: string, options?: ConnectOptions): Client
        }

        interface Client {
            get(action: string): GetResource

            put(action: string): PutResource

            post(action: string, options?: ConfigOptions): PostResource
        }

        // resources
        interface PostResource {
            id(value: string): PostResource

            action(action: string): PostResource

            request(params: SendParams): Promise<PostResponse>

            request(params: object, callback?: () => void): Promise<Response>
        }

        interface GetResource {
            id(value: string): GetResource

            action(action: string): GetResource

            request(params?: object, callback?: () => void): Promise<Response>
        }

        interface PutResource {
            id(value: string): PutResource

            request(params: object, callback?: () => void): Promise<Response>
        }

        // responses
        interface Response {
            readonly body: any
        }

        interface PostResponse {
            readonly body: PostResponseData
        }

        // response data
        interface PostResponseData {
            readonly Messages: [{
                readonly Status: string
                readonly To: ReadonlyArray<PostResponseDataTo>
                readonly Cc: ReadonlyArray<PostResponseDataTo>
                readonly Bcc: ReadonlyArray<PostResponseDataTo>

            }]
        }

        // response inner data
        interface PostResponseDataTo {
            readonly Email: string
            readonly MessageUUID: string
            readonly MessageID: number
            readonly MessageHref: string
        }

        // request params
        interface SendParams {
            // Messages content must be in separate interface
            Messages: Array<{
                From: {
                    Email: string
                    Name: string
                },
                To: Array<SendParamsRecipient>
                Cc?: Array<SendParamsRecipient>
                Bcc?: Array<SendParamsRecipient>
                Subject: string
                TextPart: string
                HTMLPart: string
                Attachments?: [{
                    "ContentType": string,
                    "Filename": string,
                    "Base64Content": string
                }]
                InlinedAttachments?: [{
                    ContentType: string,
                    Filename: string,
                    ContentID: string,
                    Base64Content: string
                }]
            }>
            SandboxMode?: boolean
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
    }

    namespace SMS {

        interface Root {
            connect(apiToken: string, options?: ConnectOptions): Client
        }

        interface Client {
            get(action: string): GetResource

            post(action: string): PostResource
        }

        // resources
        interface GetResource {
            id(value: string): GetResource

            action(action: string): GetResourceAction

            request(params?: GetParams): Promise<GetResponse>
        }

        interface PostResource {
            action(action: string): PostResource

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
            readonly body: GetResponseData
        }

        interface SendResponse {
            readonly body: PostResponseData
            readonly url: string
        }

        interface ExportResponse {
            readonly body: ExportResponseData
        }

        interface GetResponseAction {
            readonly body: GetResponseActionData
        }

        // response data
        interface GetResponseData {
            readonly Data: ReadonlyArray<GetResponseDataData>
        }

        interface PostResponseData {
            readonly From: string
            readonly To: string
            readonly Text: string
            readonly MessageId: string
            readonly SmsCount: number
            readonly CreationTS: number
            readonly SentTS: number
            readonly Cost: ResponseCost
            readonly Status: ResponseStatus
        }

        interface ExportResponseData {
            readonly ID: number
            readonly CreationTS?: number
            readonly ExpirationTS?: number
            readonly Status: ResponseStatus
            readonly URL?: string
            readonly FromTs?: number
            readonly ToTs?: number
        }

        interface GetResponseActionData {
            readonly Count: number
        }

        // response inner data
        interface GetResponseDataData {
            readonly From: string
            readonly To: string
            readonly Status: ResponseStatus
            readonly MessageId: string
            readonly CreationTS: number
            readonly SentTS: number
            readonly SMSCount: number
            readonly Cost: ResponseCost
        }

        interface ResponseStatus {
            readonly Code: number
            readonly Name: string
            readonly Description: string
        }

        interface ResponseCost {
            readonly Value: number
            readonly Currency: string
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
}


// private helper interfaces
interface SendParamsRecipient {
    Email: string
    Name: string
}