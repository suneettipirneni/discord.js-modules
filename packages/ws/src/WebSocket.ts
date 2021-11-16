/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-require-imports */
import util from 'node:util';
import { URLSearchParams } from 'url';

import type { WebSocket } from 'ws';

type Constructor<T> = new (...args: any[]) => T;

const textDecoder = new util.TextDecoder();
let erlpack: unknown;

try {
	erlpack = require('erlpack');
} catch (error) {}

type EncodingType = 'json' | 'etf';

interface WebsocketExports {
	[state: string]: any;
	Websocket?: Constructor<WebSocket>;
	pack?: unknown;
	unpack?: (data: Buffer | string, type: EncodingType) => Record<string, unknown>;
	encoding?: EncodingType;
	create?: (gateway: string, query: Record<string, string>, ...args: any[]) => WebSocket;
}

const websocketExports: WebsocketExports = {};

websocketExports.encoding = erlpack ? 'etf' : 'json';
websocketExports.Websocket = require('ws');

websocketExports.pack = erlpack;
websocketExports.unpack = (data, type) => {
	if (websocketExports.encoding === 'json' || type === 'json') {
		if (typeof data !== 'string') {
			data = textDecoder.decode(data);
		}
		return JSON.parse(data);
	}
	if (!Buffer.isBuffer(data)) data = Buffer.from(new Uint8Array(data as any));

	// @ts-ignore
	return erlpack.unpack(data);
};

websocketExports.create = (gateway, query = {}, ...args) => {
	const [g, q] = gateway.split('?');
	query.encoding = websocketExports.encoding as string;
	const params = new URLSearchParams(query);

	if (q) new URLSearchParams(q).forEach((value, key) => params.set(key, value));
	const ws = new (websocketExports as Required<WebsocketExports>).Websocket(
		`${g}?${query as unknown as string}`,
		...args,
	);
	return ws;
};

['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].map(
	(state) => (websocketExports[state] = (websocketExports.Websocket as unknown as Record<string, unknown>)[state]),
);

export default websocketExports;
