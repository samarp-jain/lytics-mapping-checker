# Lytics Mapping Checker

A Next.js application to check Lytics expression mappings and see parsed results. This tool allows you to test Lytics expressions with field mappings and visualize the results.

## Features

- Input Lytics expressions
- Define field mappings (field name → input value)
- Check mappings and see parsed results
- Clean, modern UI with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```
   - Edit `.env.local` and add your Lytics auth token:
   ```env
   LYTICS_AUTH_TOKEN=your_actual_auth_token_here
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   └── check-mapping/
│   │       └── route.ts          # API route for Lytics integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── MappingInput.tsx          # Field mapping input component
│   └── ResultDisplay.tsx         # Result display component
└── package.json
```

## API Integration

The application is integrated with the Lytics API endpoint:
- **Endpoint**: `https://api.lytics.io/v2/schema/expression/evaluate`
- **Method**: POST
- **Authentication**: Uses Authorization token header from environment variable

The API route is located at `app/api/check-mapping/route.ts`. It:
1. Takes the Lytics expression from the input
2. Converts field mappings to the data object format
3. Uses the auth token from `LYTICS_AUTH_TOKEN` environment variable
4. Sends the request to Lytics API
5. Returns the parsed result

## Environment Variables

The application requires a `.env.local` file with your Lytics auth token:
- `LYTICS_AUTH_TOKEN`: Your Lytics API authentication token

**Security**: The `.env.local` file is gitignored and will not be committed to version control.

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 18** - UI library

## Usage

1. Enter a Lytics expression in the expression input box
2. Add field mappings (field name and corresponding input value)
3. Click "Check Mapping" to evaluate the expression
4. View the parsed result from Lytics API

**Note**: The auth token is securely stored in `.env.local` and is not exposed in the UI.

## How It Works

1. The frontend collects the expression and field mappings
2. Field mappings are converted to a data object: `{ fieldName: inputValue }`
3. The API route sends a POST request to Lytics with:
   - `expression`: The Lytics expression string
   - `data`: Object containing field name → value mappings
4. Lytics evaluates the expression and returns the result
5. The result is displayed in the UI

