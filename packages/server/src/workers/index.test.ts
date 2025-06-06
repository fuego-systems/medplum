import { closeWorkers, initWorkers } from '.';
import { loadTestConfig } from '../config/loader';
import { closeDatabase, initDatabase } from '../database';
import { loadStructureDefinitions } from '../fhir/structure';
import { closeRedis, initRedis } from '../redis';
import { seedDatabase } from '../seed';
import { initBinaryStorage } from '../storage/loader';

describe('Workers', () => {
  beforeAll(() => {
    loadStructureDefinitions();
  });

  test('Init and close', async () => {
    const config = await loadTestConfig();
    initRedis(config.redis);
    await initDatabase(config);
    await seedDatabase();
    initBinaryStorage('file:binary');
    initWorkers(config);
    await closeWorkers();
    await closeDatabase();
    await closeRedis();
  });
});
