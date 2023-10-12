function post(endpoint, body) {
  return fetch(`http://localhost:4000/api/v1${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
}

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
