# Remnawave TypeScript SDK

A TypeScript SDK client for interacting with the [Remnawave API](https://remna.st).
This library simplifies working with the API by providing convenient controllers, TypeScript interfaces for requests and responses, and easy-to-use methods.

## ✨ Key Features

- **Controller-based design**: Split functionality into separate controllers for flexibility. Use only what you need!
- **TypeScript interfaces**: Strongly-typed requests and responses for better reliability.
- **Promise-based API**: All methods return Promises for easy async/await usage.
- **Modular usage**: Import individual controllers or the full SDK as needed.

## 📦 Installation

```bash
npx jsr add @kcrz/remnawave-sdk
```

or

```bash
bunx jsr add @kcrz/remnawave-sdk
```

## 🚀 Usage

Here's a quick example to get you started:

```typescript
import { RemnawaveSDK } from "remnawave-sdk";

async function main() {
  // URL to your panel (ex. https://vpn.com or http://127.0.0.1:3000)
  const baseUrl = process.env.REMNAWAVE_BASE_URL;
  // Bearer Token from panel (section: API Tokens)
  const token = process.env.REMNAWAVE_TOKEN;

  // Initialize the SDK
  const remnawave = new RemnawaveSDK(baseUrl, token);

  try {
    // Fetch all users
    const response = await remnawave.users.getAllUsersV2();
    console.log("Total users:", response.total);
    console.log("List of users:", response.users);

    // Disable a specific user
    const testUuid = "e4d3f3d2-4f4f-4f4f-4f4f-4f4f4f4f4f4f";
    const disabledUser = await remnawave.users.disableUser(testUuid);
    console.log("Disabled user:", disabledUser);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

## 🧪 Running Tests

To run the test suite:

```bash
npm test
```

## 📚 API Documentation

### Users Controller

The Users controller provides methods for managing users:

```typescript
// Get all users
const users = await remnawave.users.getAllUsersV2();

// Create a new user
const newUser = await remnawave.users.createUser({
  username: "newuser",
  email: "newuser@example.com",
  data_limit: 1000,
  expire_at: "2024-12-31T00:00:00Z",
});

// Disable a user
const disabledUser = await remnawave.users.disableUser("user-uuid");

// Get user by UUID
const user = await remnawave.users.getUserByUuid("user-uuid");
```
