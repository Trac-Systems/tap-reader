import { test } from '@japa/runner'
import TracManager from '../src/TracManager.mjs'

test.group('TracManager', () => {
  test('initialize', async ({ expect }) => {

    let tracCore = new TracManager();
    await tracCore.initReader();

    console.log('inside')

    // Test logic goes here
    expect(1 + 1).toBe(2)

    await tracCore.close();
    
  }).disableTimeout()
});