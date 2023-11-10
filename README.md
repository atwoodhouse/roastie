# Roastie - Sarcastic image roasting Telegram bot

Roastie is a unique Telegram bot, crafted in Typescript, that harnesses the power of OpenAI's GPT-4 Vision API. It delivers snappy, borderline roasts in response to images sent by users. Perfectly balancing on the edge of OpenAI's policy, Roastie offers humorously sarcastic comments, making it a hilarious addition to any chat.

## Prerequisites

- Node.js v18. Use [nvm](https://github.com/nvm-sh/nvm) for optimal installation.
- [pnpm](https://pnpm.io/) for package management. Install globally via `npm i -g pnpm`.

## Setup Guide

1. Clone the repository.
2. Create a `.env` file as per the given template.
3. Install dependencies using `pnpm i`.
4. Initiate the bot with `pnpm start`.

## Configuration

Prepare a `.env` file in the project's root directory. Include the following keys and your respective values:

| Key             | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| BOT_TOKEN       | Your Telegram bot token, obtainable from [BotFather](https://t.me/botfather). |
| OPENAI_API_KEY  | API key for OpenAI.                                                           |
| ALLOWED_CHAT_ID | The ID of the chat where the bot is allowed to operate (optional).            |

Ensure to replace the placeholders with actual data.

The current roasting prompt is in Swedish but can easily be translated to any language to suit your audience.

## Installation

```bash
pnpm install
```

## Usage

```bash
pnpm start
```

## Contributing

Contributions are welcome! Submit pull requests or open issues for any bugs or feature suggestions.

## Support

Need help or support? Create an issue in the repository for assistance.
