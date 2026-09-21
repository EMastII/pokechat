import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock database files
const USERS_FILE = path.join(__dirname, "data", "users.json");
const MESSAGES_FILE = path.join(__dirname, "data", "messages.json");

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

// Initialize files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

// Utility functions to read/write JSON files
const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  } catch (err) {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

const readMessages = () => {
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
  } catch (err) {
    return [];
  }
};

const writeMessages = (messages) => {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
};

// Mock API endpoints (for reference - actual API calls are handled client-side in this project)
console.log("PokéChat Mock Server initialized");
console.log("Users database:", USERS_FILE);
console.log("Messages database:", MESSAGES_FILE);

export { readUsers, writeUsers, readMessages, writeMessages };
