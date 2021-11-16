import type { Status } from './status';
import WebSocket from './WebSocket';

export class WebSocketShard {
	private readonly id: number;
	private status: Status = Status.IDLE;
	private readonly sequence: number = -1;
	private closeSequence = 0;
	private sessionId: string | null = null;
	private ping = -1;
	private lastPingTimestamp = -1;
	private lastHeartbeatAcked = true;
	private rateLimit = {
		value: {
			queue: [],
			total: 120,
			remaining: 120,
			time: 60e3,
			timer: null,
		},
	};
	private connection = { value: null, writeable: true };
	private inflate = { value: null, writable: true };

  public connect() {
    const { gateway, client } = 
  }

}
