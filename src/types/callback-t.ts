import type { TableDefinition } from 'convex/server';
import type { getCallbackT } from '../utils/callback-t.js';

export type CallbackT<$HostTableDefinition extends TableDefinition> =
	ReturnType<typeof getCallbackT<$HostTableDefinition>>;
