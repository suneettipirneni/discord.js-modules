export const WSCodes: Record<number, string> = {
	1000: 'WS_CLOSE_REQUESTED',
	4004: 'TOKEN_INVALID',
	4010: 'SHARDING_INVALID',
	4011: 'SHARDING_REQUIRED',
	4013: 'INVALID_INTENTS',
	4014: 'DISALLOWED_INTENTS',
} as const;
