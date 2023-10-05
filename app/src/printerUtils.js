export async function move(cmd) {
  return await fetch("http://localhost:4000/api/v1/cmd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cmd }),
  });
}

export async function sendCmd(cmd) {
  return await fetch("http://localhost:4000/api/v1/cmd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cmd }),
  });
}

export async function pausePrint(params) {
  return await fetch("http://localhost:4000/api/v1/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
