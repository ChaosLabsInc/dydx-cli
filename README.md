# Chaos Labs <> dYdXCLI

![image](https://user-images.githubusercontent.com/25058984/157460460-808a572e-227a-4e54-a4bb-8906999dde73.png)

# Usage:

After installation, to start the CLI run `npm run start` and the CLI menu will open
See sections below for detailed instructions of the dfferent options.

# Installation

1. git clone repo.
2. run `npm i` from inside the repo.
3. run `npm run build` from inside the repo.

## Public API:

The <a href="https://docs.dYdX.exchange/?typescript#public-http-api" target="_blank">Public API </a> can be used directly by following the CLI instructions, for optional values, leaving an empty input will result in discarding these fields form the call.

- You can view all the available calls and their descriptions through _'See Public Method Descriptions'_ option.

## Private API:

<a href="https://docs.dYdX.exchange/?typescript#private-http-api" target="_blank">Private API </a> requires authentication, see Authentication section beefore the first use.
In addition, using the Prviate API requires that the user will finish onboarding through the UI first for it work.
If your API requests fail with `API key not found` - that means the onboarding proccess is not done.
Finished the onboarding to dYdXhere <a href="https://trade.dYdX.exchange/portfolio/overview" target="_blank">Private API </a>

- You can view all the available calls and their descriptions through _'See Private Method Descriptions'_ option.

## Example Flow:

Let's see how we get the **_GetMarkets_** from the Public API:

1. Choose _'Call Public Methods'_
   <img width="567" alt="image" src="https://user-images.githubusercontent.com/25058984/157417045-f3cbe675-23a8-44b0-a9f2-4b1558fd19b3.png">

2. Choose _'GetMarkets'_
   <img width="540" alt="image" src="https://user-images.githubusercontent.com/25058984/157417440-156f191e-5a96-461a-a482-c154356b919e.png">

3. Enter the required parameters for the _'GetMarkets'_ method:
   <img width="521" alt="image" src="https://user-images.githubusercontent.com/25058984/157417629-0d03cc6f-da54-42e8-a69e-9b02940c913d.png">

4. Done:
   <img width="640" alt="image" src="https://user-images.githubusercontent.com/25058984/157417725-9d8b24a4-a68a-4049-b770-a294fcbdad53.png">

# Authentication:

- Authenticaiton is only required for the Private API. If you're using the <a href="https://docs.dYdX.exchange/?typescript#public-http-api" target="_blank">Public API </a> then you can simply start using the CLI.
- Authentication is only required once. The authenticaiton credentials will be stored under `config/config.json` for future usage of the CLI.

### Authenticaiton flow:

When first starting, the CLI will show that you're logged out, like so:
<img width="554" alt="image" src="https://user-images.githubusercontent.com/25058984/157411049-dabdc77b-80c1-4e52-b2e8-a94ca16b1bca.png">

- In order to authenticate you CLI against dYdXthe wallet private key is required, once, to fetch the dYdXcredentials. The key will not be saved, but the dYdXcredentials will be stored into the `config/config.json`.

1. Go to _'Authentication Options'_ in the main menu.
2. Go to _'Login Using Ethereum Private Key'_
3. Enter your wallet address.
4. Enter your private key.

Done. When you next open the CLI you should see that you're logged in like so:
<img width="589" alt="image" src="https://user-images.githubusercontent.com/25058984/157411238-be9c5abe-b4a6-44be-8f58-49ed7fb9231f.png">
