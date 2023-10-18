import { post } from "./utils";

export async function move(cmd, backend) {
  return await post(backend, "/cmd", { cmd });
}

export async function sendCmd(cmd, backend) {
  return await post(backend, "/cmd", { cmd });
}

export async function pausePrint(backend) {
  return await post(backend, "/pausePrint");
}
export async function resumePrint(backend) {
  return await post(backend, "/resumePrint");
}

export async function stopPrint(backend) {
  return await post(backend, "/stopPrint");
}
