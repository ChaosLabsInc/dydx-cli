import cli from "./index";
const CLI_TEST_SUITE = "CLI_TEST_SUITE ";

test(`${CLI_TEST_SUITE} - welcomeMessage`, async () => {
  // should not return value
  expect(await cli.welcomeMessage()).toBe(undefined);
});

describe(`${CLI_TEST_SUITE} - get desired pool`, () => {
  it("returns the pairSelection and priceFeeds ", async () => {
    const { pools, inquirerChoices } = await cli.getPools();
    expect(Array.isArray(pools)).toBeTruthy();
    expect(pools.length).toBeGreaterThan(0);
    expect(Array.isArray(inquirerChoices)).toBeTruthy();
    expect(inquirerChoices.length).toBeGreaterThan(0);
  });
});
