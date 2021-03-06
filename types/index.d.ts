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

            request(params: object, callback?: (error: Error, res: Response) => void): Promise<Response>
        }

        interface GetResource {
            id(value: string): GetResource

            action(action: string): GetResource

            request(params?: object, callback?: (error: Error, res: Response) => void): Promise<Response>
        }

        interface PutResource {
            id(value: string): PutResource

            request(params: object, callback?: (error: Error, res: Response) => void): Promise<Response>
        }

        // responses
        interface Response {
            readonly body: any
        }

        interface PostResponse {
            readonly body: PostResponseData
        }

        // request params
        interface SendParams {
            Messages: Array<SendParamsMessage>
            SandboxMode?: boolean
        }
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

// *** Email private interfaces *** //
interface SendParamsRecipient {
    Email: string
    Name: string
}

interface SendParamsMessage {
    From: {
        Email: string
        Name: string
    }
    To: Array<SendParamsRecipient>
    Cc?: Array<SendParamsRecipient>
    Bcc?: Array<SendParamsRecipient>
    Variables?: object
    TemplateID? : number
    TemplateLanguage?: boolean
    Subject: string
    TextPart?: string
    HTMLPart?: string
    MonitoringCategory?: string
    URLTags?: string
    CustomCampaign?: string
    DeduplicateCampaign?: boolean
    EventPayload?: string
    CustomID?: string
    Headers?: object
    Attachments?: [{
        "ContentType": string
        "Filename": string
        "Base64Content": string
    }]
    InlinedAttachments?: [{
        ContentType: string
        Filename: string
        ContentID: string
        Base64Content: string
    }]
}

interface PostResponseDataMessage {
    readonly Status: string
    readonly CustomID: string
    readonly To: ReadonlyArray<PostResponseDataTo>
    readonly Cc: ReadonlyArray<PostResponseDataTo>
    readonly Bcc: ReadonlyArray<PostResponseDataTo>
}

interface PostResponseDataTo {
    readonly Email: string
    readonly MessageUUID: string
    readonly MessageID: number
    readonly MessageHref: string
}

interface PostResponseData {
    readonly Messages: ReadonlyArray<PostResponseDataMessage>
}

// *** SMS private interfaces *** //
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