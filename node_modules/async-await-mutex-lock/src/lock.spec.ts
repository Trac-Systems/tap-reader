import { Lock } from "./lock"

describe("Lock Tests", () => {
  it("false when not acquired (without key)", () => {
    let lock = new Lock();
    expect(lock.isAcquired()).toBe(false);
  })

  it("false when not acquired (with key)", () => {
    let lock = new Lock<string>();
    expect(lock.isAcquired("key")).toBe(false);
  })

  it("true when acquired (without key)", async () => {
    let lock = new Lock();
    await lock.acquire();
    expect(lock.isAcquired()).toBe(true);
    lock.release();
    expect(lock.isAcquired()).toBe(false);
  })

  it("true when acquired (with key)", async () => {
    let lock = new Lock<string>();
    let key = "key";
    await lock.acquire(key);
    expect(lock.isAcquired(key)).toBe(true);
    lock.release(key);
    expect(lock.isAcquired(key)).toBe(false);
  })

  it("throws error when released without acquiring (without key)", () => {
    let lock = new Lock();
    expect(() => lock.release()).toThrowError();
  })

  it("throws error when released without acquiring (with key)", () => {
    let lock = new Lock<string>();
    expect(() => lock.release("key")).toThrowError();
  })

  // @ref: https://github.com/ide/await-lock/blob/master/src/__tests__/AwaitLock-test.ts
  it("adds to waiting list if lock already acquired (without key)", async () => {
    let lock = new Lock();
    let variable = 0;

    async function test() {
      await lock.acquire();
      expect(variable).toBe(0);

      variable++;
      await Promise.resolve();
      expect(variable).toBe(1);

      variable--;
      lock.release();
    }

    await Promise.all([test(), test(), test()]);
  })

  it("adds to waiting list if lock already acquired (with key)", async () => {
    let lock = new Lock<string>();
    let key = "key";
    let variable = 0;

    async function test(k) {
      await lock.acquire(k);
      expect(variable).toBe(0);

      variable++;
      await Promise.resolve();
      expect(variable).toBe(1);

      variable--;
      lock.release(k);
    }

    await Promise.all([test(key), test(key), test(key)]);
  })

})
