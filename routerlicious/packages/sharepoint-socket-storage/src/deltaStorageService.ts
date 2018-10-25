import * as api from "@prague/runtime-definitions";
// tslint:disable-next-line:match-default-export-name
import axios from "axios";
import * as querystring from "querystring";
import { IDeltaFeedResponse, ISequencedDocumentOp } from "./sharepointContracts";

/**
 * Storage service limited to only being able to fetch documents for a specific document
 */
export class DocumentDeltaStorageService implements api.IDocumentDeltaStorageService {
    constructor(
        private tenantId: string,
        private id: string,
        private token: string,
        private storageService: api.IDeltaStorageService) {
    }

    /* tslint:disable:promise-function-async */
    public get(from?: number, to?: number): Promise<api.ISequencedDocumentMessage[]> {
        return this.storageService.get(this.tenantId, this.id, this.token, from, to);
    }
}

/**
 * Provides access to the sharepoint delta storage
 */
export class SharepointDeltaStorageService implements api.IDeltaStorageService {
    constructor(private deltaFeedUrl: string) {
    }

    public async get(
        tenantId: string,
        id: string,
        token: string,
        from?: number,
        to?: number): Promise<api.ISequencedDocumentMessage[]> {
        const requestUrl = this.constructUrl(from, to);
        let headers = null;
        if (token) {
            headers = {
                Authorization: `Bearer ${new Buffer(`${token}`)}`,
            };
        }
        const result = await axios.get<IDeltaFeedResponse>(requestUrl, { headers });
        const ops = result.data.value;
        const sequencedMsgs: api.ISequencedDocumentMessage[] = [];

        // TODO: Having to copy the "op" property on each element of the array is undesirable.
        // SPO is looking into updating this layer of the envelope to match routerlicious
        // The logic below takes care of n/n-1 when that change happens
        if (ops.length > 0 && "op" in ops[0]) {
            (ops as ISequencedDocumentOp[]).forEach((op) => {
                sequencedMsgs.push(op.op);
            });
            return sequencedMsgs;
        } else {
            return ops as api.ISequencedDocumentMessage[];
        }
    }

    public constructUrl(
        from?: number,
        to?: number): string {
        let deltaFeedUrl: string;
        const queryFilter = `sequenceNumber ge ${from} and sequenceNumber le ${to}`;
        const query = querystring.stringify({ filter: queryFilter });
        deltaFeedUrl = `${this.deltaFeedUrl}?$${query}`;

        return deltaFeedUrl;
    }
}
