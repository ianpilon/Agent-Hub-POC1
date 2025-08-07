export const blockchainDescriptions = {
  Cardano: {
    briefDefinition: "A third-generation, proof-of-stake blockchain platform designed for sustainability, scalability, and transparency.",
    keyStatistics: [
      { label: "Founded", value: "2015" },
      { label: "Mainnet Launch", value: "2017" },
      { label: "Native Token", value: "ADA" },
      { label: "Consensus Mechanism", value: "Ouroboros (Proof-of-Stake)" }
    ],
    majorEcosystemComponents: ["RealFi Sector", "Derivatives DeFi", "Entertainment", "Securities Sector", "Governance", "NFT Ecosystem", "Innovation & Development"],
    keyOrganizations: ["IOHK (Input Output Hong Kong)", "Cardano Foundation", "Emurgo"],
    notableFeatures: ["Smart Contract Platform (Plutus)", "Native Token Support", "Decentralized Governance (Catalyst)", "Multi-asset Ledger"],
    ecosystemHighlights: {
      "DEXes": ["SundaeSwap", "MinSwap", "WingRiders"],
      "NFT Marketplaces": ["JPG Store", "NMKR"],
      "DeFi Protocols": ["Liqwid", "AXO"],
      "Identity Solutions": ["Atala PRISM"]
    },
    communityEngagement: ["Stake Pool Operators (SPOs)", "Project Catalyst for community-driven innovation", "Active developer and user communities"],
    interoperability: ["Bridges to other blockchains", "Cross-chain compatibility efforts"],
    realWorldApplications: ["RealFi initiatives", "Educational partnerships", "Government collaborations (e.g., Ethiopia)"],
    futureRoadmap: ["Scalability improvements (Hydra)", "Enhanced governance mechanisms", "Expansion of real-world use cases"],
    environmentalImpact: ["Energy-efficient Proof-of-Stake consensus", "Sustainability initiatives"]
  },
  // Add other blockchains here...
  Ethereum: {
    briefDefinition: "A decentralized, open-source blockchain with smart contract functionality.",
    keyStatistics: [
      { label: "Founded", value: "Placeholder" },
      { label: "Mainnet Launch", value: "Placeholder" },
      { label: "Native Token", value: "ETH" },
      { label: "Consensus Mechanism", value: "Placeholder" }
    ],
    majorEcosystemComponents: ["Placeholder for information coming soon"],
    keyOrganizations: ["Placeholder for information coming soon"],
    notableFeatures: ["Placeholder for information coming soon"],
    ecosystemHighlights: {
      "DeFi": ["Placeholder for information coming soon"],
      "NFTs": ["Placeholder for information coming soon"],
      "DAOs": ["Placeholder for information coming soon"]
    },
    communityEngagement: ["Placeholder for information coming soon"],
    interoperability: ["Placeholder for information coming soon"],
    realWorldApplications: ["Placeholder for information coming soon"],
    futureRoadmap: ["Placeholder for information coming soon"],
    environmentalImpact: ["Placeholder for information coming soon"]
  },
  // ... more blockchains
  BASE: {
    briefDefinition: "A layer 2 blockchain built on Ethereum, designed for scalability and low-cost transactions.",
    keyStatistics: [
      { label: "Founded", value: "2023" },
      { label: "Mainnet Launch", value: "August 2023" },
      { label: "Native Token", value: "ETH" },
      { label: "Consensus Mechanism", value: "Optimistic Rollup" }
    ],
    majorEcosystemComponents: [
      "DeFi protocols",
      "NFT marketplaces",
      "Gaming platforms",
      "Cross-chain bridges"
    ],
    keyOrganizations: [
      "Coinbase",
      "Optimism Collective",
      "BASE ecosystem partners"
    ],
    notableFeatures: [
      "EVM compatibility",
      "Low transaction fees",
      "Fast transaction finality",
      "Seamless integration with Ethereum"
    ],
    ecosystemHighlights: {
      "DeFi": ["Placeholder for BASE DeFi projects"],
      "NFTs": ["Placeholder for BASE NFT platforms"],
      "Gaming": ["Placeholder for BASE gaming projects"],
      "Infrastructure": ["Placeholder for BASE infrastructure tools"]
    },
    communityEngagement: [
      "Developer grants program",
      "Hackathons and bounties",
      "Community-driven governance initiatives"
    ],
    interoperability: [
      "Native compatibility with Ethereum",
      "Cross-chain bridges to other networks",
      "Integration with multi-chain DeFi protocols"
    ],
    realWorldApplications: [
      "Low-cost remittances",
      "Efficient microtransactions",
      "Scalable decentralized applications"
    ],
    futureRoadmap: [
      "Further optimization of transaction costs",
      "Expansion of ecosystem partnerships",
      "Enhanced developer tools and resources"
    ],
    environmentalImpact: [
      "Inherits Ethereum's energy efficiency post-merge",
      "Reduces on-chain load, contributing to overall network sustainability"
    ]
  },

  // ... other blockchain entries ...
  Polkadot: {
    briefDefinition: "A multi-chain network protocol that allows specialized blockchains to communicate with each other in a secure, trust-free environment.",
    keyStatistics: [
      { label: "Founded", value: "2016" },
      { label: "Mainnet Launch", value: "May 2020" },
      { label: "Native Token", value: "DOT" },
      { label: "Consensus Mechanism", value: "Nominated Proof-of-Stake (NPoS)" }
    ],
    majorEcosystemComponents: [
      "Relay Chain",
      "Parachains",
      "Parathreads",
      "Bridges",
      "Cross-chain message passing (XCMP)"
    ],
    keyOrganizations: [
      "Web3 Foundation",
      "Parity Technologies",
      "Polkadot Treasury"
    ],
    notableFeatures: [
      "Interoperability between different blockchains",
      "Shared security model",
      "Scalability through parallel processing",
      "On-chain governance",
      "Forkless upgrades"
    ],
    ecosystemHighlights: {
      "DeFi": ["Acala", "Moonbeam", "Parallel Finance"],
      "Smart Contracts": ["Astar", "Moonbeam", "Edgeware"],
      "Oracle": ["ChainLink", "Kylin Network"],
      "Identity": ["KILT Protocol", "Litentry"],
      "IoT": ["Robonomics", "MXC"]
    },
    communityEngagement: [
      "Polkadot Ambassador Program",
      "Web3 Foundation Grants",
      "Kusama Network (Canary Network)",
      "Substrate Builders Program"
    ],
    interoperability: [
      "Cross-chain message passing (XCMP)",
      "Bridge protocols to external networks (e.g., Ethereum, Bitcoin)",
      "Parachain and parathread interoperability"
    ],
    realWorldApplications: [
      "Cross-chain DeFi applications",
      "Supply chain management",
      "Digital identity solutions",
      "IoT data management and monetization"
    ],
    futureRoadmap: [
      "Continuous parachain slot auctions",
      "Implementation of XCMP",
      "Scaling to 100+ parachains",
      "Enhanced governance mechanisms"
    ],
    environmentalImpact: [
      "Energy-efficient Nominated Proof-of-Stake consensus",
      "Shared security model reduces overall network energy consumption"
    ]
  },

  // ... other blockchain entries ...
  Solana: {
    briefDefinition: "A high-performance blockchain designed to support decentralized applications (dApps) and cryptocurrencies, known for its speed, scalability, and low transaction costs.",
    keyStatistics: [
      { label: "Founded", value: "2017" },
      { label: "Mainnet Launch", value: "March 2020" },
      { label: "Native Token", value: "SOL" },
      { label: "Consensus Mechanism", value: "Proof of History (PoH) & Proof of Stake (PoS)" },
      { label: "Transaction Speed", value: "Up to 65,000 TPS" },
      { label: "Block Time", value: "~400 milliseconds" }
    ],
    majorEcosystemComponents: [
      "DeFi protocols",
      "NFT marketplaces",
      "Web3 applications",
      "Gaming platforms",
      "Decentralized exchanges"
    ],
    keyOrganizations: [
      "Solana Foundation",
      "Solana Labs",
      "Jump Crypto",
      "Multicoin Capital"
    ],
    notableFeatures: [
      "High throughput (65,000 TPS)",
      "Proof of History (PoH) consensus",
      "Low transaction costs",
      "Fast block times (~400ms)",
      "Scalability without performance degradation",
      "Support for Rust and C programming languages",
      "Solana SDK for developers"
    ],
    ecosystemHighlights: {
      "DeFi": ["Serum", "Raydium", "Orca"],
      "NFTs": ["Magic Eden", "Metaplex", "Solanart"],
      "Web3": ["Brave Browser integration", "Phantom Wallet"],
      "Gaming": ["Star Atlas", "DeFi Land", "Aurory"]
    },
    communityEngagement: [
      "Solana Hackathons",
      "Solana Season events",
      "Solana Campus (educational initiative)",
      "Active developer Discord community"
    ],
    interoperability: [
      "Wormhole (cross-chain bridge to Ethereum, BSC, Terra, etc.)",
      "Allbridge (cross-chain transfers)",
      "Swim Protocol (cross-chain swaps)"
    ],
    realWorldApplications: [
      "High-frequency trading platforms",
      "Decentralized social media (e.g., Grape Protocol)",
      "Music and video streaming services",
      "Supply chain management",
      "Micropayments",
      "High-volume DeFi operations"
    ],
    futureRoadmap: [
      "Firedancer (new core validator client)",
      "Scaling solutions (e.g., Nitro)",
      "Enhanced developer tools and SDKs",
      "Expansion of enterprise partnerships"
    ],
    environmentalImpact: [
      "Energy-efficient Proof of Stake consensus",
      "Carbon-neutral blockchain initiative",
      "Solana Foundation's energy use report and offsetting efforts"
    ],
    technicalDetails: [
      "Proof of History (PoH) provides a historical record of events, enhancing scalability",
      "Maintains high performance with increasing network adoption",
      "Supports development in Rust and C languages",
      "Offers Solana SDK for streamlined development"
    ]
  },

  // ... other blockchain entries ...
  Bitcoin: {
    briefDefinition: "The world's first decentralized cryptocurrency and blockchain network, designed as a peer-to-peer electronic cash system.",
    keyStatistics: [
      { label: "Founded", value: "2008 (Whitepaper published)" },
      { label: "Mainnet Launch", value: "January 3, 2009" },
      { label: "Native Token", value: "BTC" },
      { label: "Consensus Mechanism", value: "Proof of Work (PoW)" },
      { label: "Maximum Supply", value: "21 million BTC" }
    ],
    majorEcosystemComponents: [
      "Mining networks",
      "Wallets and custody solutions",
      "Payment processors",
      "Exchanges",
      "Layer 2 scaling solutions"
    ],
    keyOrganizations: [
      "Bitcoin Core developers",
      "Bitcoin Mining Council",
      "Various open-source contributors"
    ],
    notableFeatures: [
      "First-ever blockchain implementation",
      "Decentralized and permissionless network",
      "Fixed supply (deflationary model)",
      "Pseudonymous transactions",
      "Immutable transaction history"
    ],
    ecosystemHighlights: {
      "Layer 2 Solutions": ["Lightning Network", "Liquid Network"],
      "Wallets": ["Bitcoin Core", "Electrum", "Hardware wallets (Ledger, Trezor)"],
      "Mining": ["Major mining pools", "ASIC manufacturers"],
      "Financial Products": ["Bitcoin ETFs", "Futures contracts"]
    },
    communityEngagement: [
      "Bitcoin Improvement Proposals (BIPs)",
      "Bitcoin conferences (e.g., Bitcoin 2023)",
      "Online forums (Bitcointalk, Reddit r/Bitcoin)",
      "Open-source development contributions"
    ],
    interoperability: [
      "Wrapped Bitcoin (WBTC) on Ethereum",
      "Cross-chain bridges to other networks",
      "Atomic swaps"
    ],
    realWorldApplications: [
      "Store of value ('Digital Gold')",
      "Cross-border remittances",
      "Hedge against inflation",
      "Micropayments via Lightning Network"
    ],
    futureRoadmap: [
      "Continued development of Lightning Network",
      "Potential soft forks for network upgrades",
      "Schnorr signatures and Taproot improvements",
      "Enhanced privacy features"
    ],
    environmentalImpact: [
      "Energy-intensive Proof of Work mining",
      "Ongoing debates about energy consumption",
      "Initiatives for renewable energy in mining",
      "Research into more efficient mining hardware"
    ]
  },

  // ... other blockchain entries ...
};