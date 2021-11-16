import { Collection } from '@discordjs/collection';
import { Status } from './status';
import { WebSocketShard } from './WebSocketShard';
import { WSCodes } from './WSCodes';

export class WS {
	private static readonly invalidTokenError = new Error(WSCodes[4004]);
	private gateway: string | null = null;
	private totalShards: number;
	private readonly shards = new Collection<number, WebSocketShard>();
	private readonly shardQueue = new Set<WebSocketShard>();
	private readonly packetQueue = new Set<Record<string, unknown>>();
	public status = Status.IDLE;
	private destroyed = false;
	private reconnecting = false;

	public async connect() {
		const invalidTokenError = new Error(WSCodes[4004]);

    const { url: gatewayURL, shards: reccomendedShards, session_start_limit: sessionStartLimit } = await 
	}
}
