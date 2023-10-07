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

export async function pausePrint() {
  return await fetch("http://localhost:4000/api/v1/pausePrint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
export async function resumePrint() {
  return await fetch("http://localhost:4000/api/v1/resumePrint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}
