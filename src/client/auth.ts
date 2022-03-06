import { ApiKeyCredentials } from "@dydxprotocol/v3-client";
import { Client } from ".";

//Auth - require ETHEREUM_PRIVATE_KEY in the env variable.
export async function Auth(address: string): Promise<ApiKeyCredentials> {
  const ethKey = process.env.ETHEREUM_PRIVATE_KEY;
  if (ethKey === undefined) {
    throw new Error("Need to provide eth private through env: 'export ETHEREUM_PRIVATE_KEY=<key> or through CLI");
  }
  Client.web3?.eth.accounts.wallet.add(ethKey);
  const credentials = await Client.onboarding.recoverDefaultApiCredentials(address);
  return credentials;
}

Auth("0x866505a747D958b21E56D516DA61f13949949C2d")
  .then((credentials) => {
    console.log(credentials);
  })
  .catch((e) => {
    console.log("err", e);
  });

/*
  {
  secret: 'SaktbF1vJPfzeig8QKwd6ZJQmSC131pKb0d5IOsZ',
  key: '30959bcd-996e-125e-f581-3af95c90f3a6',
  passphrase: 'VxIG4Iyl8sjAeQ5Vzgz1'
}
*/
