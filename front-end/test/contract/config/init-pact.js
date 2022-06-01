import { Pact } from '@pact-foundation/pact';
import path from 'path';
const consumerName = 'ComoVoyFront';
const providerName = 'ComoVoyBack';
export const provider = new Pact({
    consumer: consumerName,
    provider: providerName,
    port: 3000,
    cors: true,
    log: path.resolve(process.cwd(), './test/contract/logs',
        `${consumerName}-${providerName}.log`),
    dir: path.resolve(process.cwd(), './test/contract/pacts')
});
