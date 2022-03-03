![Chaos Labs - Chainlink Collab](https://github.com/ChaosLabsInc/uniswap-v3-oracle-cli/blob/main/img/ChaosLabsUniswap.jpg)

This repository hosts a CLI utitlity for mocking Uniswap V3 Oracle prices in a local hardhat mainnet fork testing environment. Navigate to our [Quickstart](#quickstart) section to get the repo up and running.

For a full deep dive to the project architecture please visit the [Chaos Labs blog](https://chaoslabs.xyz/blog).

## Why is Mocking Oracle values useful in testing?

Oracle values trigger internal state changes in web3 applications. Currently, when forking mainnent, oracle returns values are constant or in the case of TWAP oracles, require unreasoable amount of trading volume in the respective pool to change the prices. This is because TWAP oracle prices are determined by the ratio of liquidity in the pools at the time of the observations recorded, when the liquidity pools are vast, chnainging the price becomes extremely difficult. We want the ability to mock return values easily, so we can test how our contracts / applications react to different types of external data, hence this tool. Below, we provide some specific use cases for mocking oracle return values.

## Use Cases

DeFi protocols and applications are at high risk due to volatile market conditions and a myriad of security vectors. Mocking Uniswap V3 Oracle return values in a controlled, siloed testing environment allows us to address 2 common vectors.

**Volatile Market Conditions**

Volatility is a DeFi constant and is something that all protocols and applications should test for thoroughly. Internal application and protocol state is often a direct result of Oracle returns values. To further illustrate this let's use an example.

Imagine a lending protocol (Maker, AAVE, Benqi, Spectral.finance, etc..) that accepts Ethereum as collateral against stablecoin loans. What happens on a day like Black Thursday, when Ethereum prices cascade negatively to the tune of ~70% in a 48 hour time frame? Well, a lot of things happen 🤦.

![Black Thursday Img](https://github.com/ChaosLabsInc/uniswap-v3-oracle-cli/blob/main/img/Cascading-ETH.png)

One critical aspect of responding to market volatiltiy is protocol keepers triggering liquidations and thus ensuring protocol solvency.

With the ability to control Oracle return values, simulating such scenarios in your local development environment is possible.

**Oracle Manipulation**

Oracle manipulation is an additional attack vector. With this method, malicious actors research data sources that various oracle consume as sources of truth. When actors possess the ability to manipulate the underlying data source they trigger downstream effects, manifesting in altered Oracle return values. As a result of manipulated data, actors and contracts can trigger various unwanted behaviours such as modified permissions, transaction execution, emergency pausing / shutdown and more.

With the ability to manipulate Uniswap V3 Oracle return values, simulating such scenarios in your local development environment is possible.

## <a name="quickstart"></a> Prerequisites

Our command-line tool is written in Typescript. Typescript introduces type safety for Javascript. Let's install this with the following command.

- `npm i -g ts-node`
- Confirm `ts-node` installed correctly by running `ts-node` to run typescript (``) in a terminal window.

Next, we'll want to run a mainnet fork. We need the fork so we can have a snapshot of all deployed Uniswap Pools and access to their Oracle interfaces. Uniswap v3 Oracles interface can be somewhat daunting at first, that's why recommend reading the offical docs if you not familiar or read our blog post about it in the [Chaos Labs blog](https://chaoslabs.xyz/blog). `Hardhat` has an Alchemy integration. In order to fork mainnet you need an API key, so navigate to the alchemy site and sign up for one.

- Alchemy API key for mainnet fork access: [Get one here](https://www.alchemy.com/).

## <a name="quickstart"></a> QuickStart

1. `git clone https://github.com/ChaosLabsInc/uniswap-v3-oracle-cli.git`
2. `cd uniswap-v3-oracle-cli`
3. `npm i` - Installing project libs.
4. `npx hardhat compile` - Compiling solidity contracts
5. **In a separate terminal window (spawn a new window in iTerm with cmd+D)** run: `npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<YOUR_ALCHEMY_KEY>` - Spinning a mainnet fork locally.
6. `npm run start`

After running the quickstart you should have the following: 2 terminals, 1 running an alchemy mainnet fork, another running the cli-tool and it should look like this:

![Setup screenshot](https://github.com/ChaosLabsInc/uniswap-v3-oracle-cli/blob/main/img/TerminalSetup.png)

## Recommended Usage

This repo is meant to serve as an implementation spec for mocking oracle return values. This is a resource and reference for smart contract developers to implement such strategies and practices as part of their development lifecycle.

## Example Flow

1. Select a pair pool to configure / mock (ETH/USD, SNX/DAI etc...)

2. Select the desired price value returned by the pool oracle

3. Set TWAP interval for that desired price (note that different intervals will result in a different price then was picked).

4. Mock 🤝 💥

![Example Flow](https://github.com/ChaosLabsInc/uniswap-v3-oracle-cli/blob/main/img/ExampleFlow.png)

## PR Requests

Before submitting a PR please run the test suite with `npm run test`.

![Test run](https://github.com/ChaosLabsInc/uniswap-v3-oracle-cli/blob/main/img/RunTests.png)

- Ganache support
- CLI improvements. Have an idea to make this repo more user friendly? Let us know, or better yet, make a pull request :)
