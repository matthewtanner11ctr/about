import fs from "node:fs";
import path from "node:path";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envPath)) {
  const envContents = fs.readFileSync(envPath, "utf8");

  for (const line of envContents.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
    process.env[key.trim()] = value;
  }
}

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";

export async function main() {
  if (!token) {
    throw new Error(
      "Missing GITHUB_TOKEN. Set it in your shell before running npm start, for example: export GITHUB_TOKEN=your_token_here",
    );
  }

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is the capital of France?" },
      ],
      model,
    },
  });

  if (isUnexpected(response)) {
    const error = response.body?.error;
    const message =
      typeof error === "string"
        ? error
        : error?.message || response.body?.message || JSON.stringify(response.body);

    throw new Error(message);
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

