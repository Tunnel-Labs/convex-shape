import { TableDefinition } from 'convex/server';
import { getCallbackT } from 'src/utils/callback-t.js';

export type CallbackT<$HostTableDefinition extends TableDefinition> =
	ReturnType<typeof getCallbackT<$HostTableDefinition>>;
