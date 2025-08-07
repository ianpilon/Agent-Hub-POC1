import React, { useState } from "react";
import BlockchainVisualization from "@/components/BlockchainVisualization";
import InformationCard from "@/components/InformationCard";
import { useTheme } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Search as SearchIcon } from "lucide-react";
import { bitcoin } from '../data/bitcoin.js';
import { base } from '../data/base.js';
import { cardano } from '../data/cardano.js';
import { ethereum } from '../data/ethereum.js';
import { polkadot } from '../data/polkadot.js';
import { solana } from '../data/solana.js';

const Index = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { theme } = useTheme();

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    // This will be passed to the BlockchainVisualization component
    setSelectedItem(searchTerm);
  };

  return (
    <div className="relative h-full">
      {/* Header with title */}
      <div
        className="absolute top-0 left-0 w-full p-6 z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background)) 95%, transparent 100%)"
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">IOG</h1>
          
          <div className="relative w-72 flex items-center">
            <div className="absolute left-3 pointer-events-none">
              <SearchIcon className="w-4 h-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-secondary text-secondary-foreground"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main visualization area */}
      <div className="h-full flex items-center justify-center overflow-hidden">
        <ErrorBoundary>
          <BlockchainVisualization onItemSelect={setSelectedItem} />
        </ErrorBoundary>
      </div>

      {/* Information card overlay */}
      {selectedItem && (
        <div className="absolute bottom-8 right-8 z-20 max-w-md">
          <div className="modern-card p-4 shadow-lg relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label="Close information card"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <InformationCard selectedItem={selectedItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;