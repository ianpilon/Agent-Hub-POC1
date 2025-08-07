# Agent Hub POC 1

## Project Overview

This project is an interactive visualization tool for exploring multiple blockchain ecosystems. It provides a comprehensive view of various blockchain networks, including Cardano, Bitcoin, Ethereum, Solana, Polkadot, and BASE.

**Project URL**: Not Public

## Features

- Interactive, zoomable circle packing diagram of blockchain ecosystems
- Search functionality for finding specific items within the visualization
- Theme toggle for switching between light and dark modes
- Detailed information card for selected items
- Hierarchical data structures for each blockchain

## Technologies Used

- React
- Vite
- D3.js
- Tailwind CSS
- shadcn-ui

## Getting Started

To run this project locally:

1. Clone the repository:
   ```
   git clone <YOUR_GIT_URL>
   ```

2. Navigate to the project directory:
   ```
   cd multi-blockchain-galaxy
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `src/components/`: React components including BlockchainVisualization and InformationCard
- `src/data/`: JSON files containing hierarchical data for each blockchain
- `src/pages/`: Main page components
- `src/components/ui/`: UI components from shadcn-ui
- `.gpt_engineer/`: Scripts for error reporting and URL change tracking

## Customization

To add or modify blockchain data, edit the corresponding JSON files in the `src/data/` directory.

## Deployment

This project can be deployed locally.
