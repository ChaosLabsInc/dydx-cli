import { selectCall, fillParams, Welcome } from "./src/cli";
import { ExecuteCall } from "./src/client";

async function main() {
  Welcome();
  const call = await selectCall();
  const params = await fillParams(call);
  console.log(call, params);
  const res = await ExecuteCall(call, params);
  console.log(res);
}

main();
