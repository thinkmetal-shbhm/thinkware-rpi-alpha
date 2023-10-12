import { post } from "./utils";

export async function move(cmd) {
  return await post("/cmd", { cmd });
}

export async function sendCmd(cmd) {
  return await post("/cmd", { cmd });
}

export async function pausePrint() {
  return await post("/pausePrint");
}
export async function resumePrint() {
  return await post("/resumePrint");
}

export async function stopPrint() {
  return await post("/stopPrint");
}
