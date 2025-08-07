import React from 'react';
import { useTheme } from "@/components/ThemeProvider";
import { blockchainDescriptions } from '../data/blockchainDescriptions';
import BitcoinInformationCard from './BitcoinInformationCard';
import BaseInformationCard from './BaseInformationCard';
import CardanoInformationCard from './CardanoInformationCard';
import EthereumInformationCard from './EthereumInformationCard';
import PolkadotInformationCard from './PolkadotInformationCard';
import SolanaInformationCard from './SolanaInformationCard';

const InformationCard = ({ selectedItem }) => {
  const { theme } = useTheme();

  console.log("Selected Item:", selectedItem);

  if (!selectedItem) {
    return (
      <div className={`h-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#23252F]' : 'bg-white'} p-4`}>
        <p className="text-muted-foreground text-center">
          Click on an item in the visualization to see more information.
        </p>
      </div>
    );
  }

  const getItemType = (item) => {
    console.log("Item in getItemType:", item);
    if (item.description && typeof item.description === 'object') return "Blockchain";
    if (item.children && item.children[0] && item.children[0].children) return "Sector";
    if (item.children && item.children.length > 0 && !item.children[0].children) return "Role";
    return "Actor";
  };

  const itemType = getItemType(selectedItem);
  console.log("Item Type:", itemType);

  const renderBlockchainDescription = (item) => {
    switch (item.name.toLowerCase()) {
      case 'bitcoin':
        return <BitcoinInformationCard data={item} />;
      case 'base':
        return <BaseInformationCard data={item} />;
      case 'cardano':
        return <CardanoInformationCard data={item} />;
      case 'ethereum':
        return <EthereumInformationCard data={item} />;
      case 'polkadot':
        return <PolkadotInformationCard data={item} />;
      case 'solana':
        return <SolanaInformationCard data={item} />;
      default:
        return null;
    }
  };


  const renderActorDetails = (actor) => {
    return (
      <div key={actor.name} className="mb-4">
        <h3 className="text-lg font-semibold">|{actor.name}</h3>
        <p className="text-muted-foreground">{actor.description}</p>
        <p className="text-muted-foreground">Midnight Flag is {actor.flag_midnight}</p>
        <table>
          <tr><td>Social Media</td><td>Address</td><td>Follows</td></tr>
          <tr><td>X</td><td>{actor.x}</td><td>{actor.x_reach}</td></tr>
          <tr><td>YouTube</td><td>{actor.youtube}</td><td>{actor.youtube_reach}</td></tr>
          <tr><td>Discord</td><td>{actor.discord}</td><td>{actor.discord_reach}</td></tr>
        </table>
        <h5>Address Details</h5>
        <ul>
          <li>WWW : {actor.www}</li>
          <li>Email : {actor.email}</li>
          <li>Phone : {actor.phone}</li>
          <li>LinkedIn : {actor.linkedin}</li>
          <li>Location : {actor.location}</li>
          <li>Geography : {actor.geography}</li>
        </ul>
        <h5>Scoring</h5>
        <p>{actor.score}</p>
        <table>
          <tr><td>Stable</td><td>{actor.score_stable}</td><td>{actor.comment_stable}</td></tr>
          <tr><td>Open</td><td>{actor.score_open}</td><td>{actor.comment_open}</td></tr>
          <tr><td>Aligned</td><td>{actor.score_aligned}</td><td>{actor.comment_aligned}</td></tr>
          <tr><td>Capacity</td><td>{actor.score_capacity}</td><td>{actor.comment_capacity}</td></tr>
          <tr><td>Flywheel</td><td>{actor.score_flywheel}</td><td>{actor.comment_flywheel}</td></tr>
        </table>

        <h5>Comments</h5>
        <p className="text-muted-foreground">{actor.comment}</p>

        <div className="mt-2">
          <p className="text-foreground font-semibold">Overview:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Category: {actor.knowledgeGraph.overview.category}</li>
            <li>Blockchain: {actor.knowledgeGraph.overview.blockchain}</li>
            <li>Purpose: {actor.knowledgeGraph.overview.purpose}</li>
            <li>Key Features: {actor.knowledgeGraph.overview.keyFeatures.join(', ')}</li>
          </ul>
        </div>
        <div className="mt-2">
          <p className="text-foreground font-semibold">Core Features:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            {actor.knowledgeGraph.coreFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <p className="text-foreground font-semibold">Governance Models:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            {actor.knowledgeGraph.governanceModels.map((model, index) => (
              <li key={index}>{model}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <p className="text-foreground font-semibold">Security:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            {actor.knowledgeGraph.security.map((security, index) => (
              <li key={index}>{security}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <p className="text-foreground font-semibold">Integrations:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            {actor.knowledgeGraph.integrations.map((integration, index) => (
              <li key={index}>{integration}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <p className="text-foreground font-semibold">User Experience:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            {actor.knowledgeGraph.userExperience.map((experience, index) => (
              <li key={index}>{experience}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <p className="text-foreground font-semibold">Impact:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            {actor.knowledgeGraph.impact.map((impact, index) => (
              <li key={index}>{impact}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <p className="text-foreground font-semibold">Future Outlook:</p>
          <ul className="list-disc list-inside text-muted-foreground">
            {actor.knowledgeGraph.futureOutlook.map((outlook, index) => (
              <li key={index}>{outlook}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderActorDescription = (actor) => {
    const nftMarketplaceDetails = nftActors["NFT Marketplaces"]?.[actor.name];
    const nftProjectDetails = nftActors["NFT Projects and Collections"]?.[actor.name];
    const stablecoinDetails = stablecoinsAndPaymentsActors["Stablecoin Issuers"]?.[actor.name];
    const paymentSolutionDetails = stablecoinsAndPaymentsActors["Payment Solutions"]?.[actor.name];
    const bridgeDetails = crossChainBridgeActors["Cross-chain Bridge Providers"]?.[actor.name];
    const daoDetails = daoGovernanceActors["DAO Creation and Governance Platforms"]?.[actor.name];
    
    const details = nftMarketplaceDetails || nftProjectDetails || stablecoinDetails || paymentSolutionDetails || bridgeDetails || daoDetails;

    if (!details) {
      return (
        <div className="text-sm space-y-4">
          <div>
            <p className="text-foreground font-semibold">Actor:</p>
            <p className="text-muted-foreground">{actor.name}</p>
          </div>
          <div>
            <p className="text-foreground font-semibold">Description:</p>
            <p className="text-muted-foreground">No detailed information available.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="text-sm space-y-6">
        <div>
          <p className="text-foreground font-semibold">Description:</p>
          <p className="text-muted-foreground">{details.description}</p>
        </div>
        {details.knowledgeGraph && renderKnowledgeGraph(details.knowledgeGraph)}
      </div>
    );
  };

  const renderKnowledgeGraph = (graph) => {
    return (
      <div className="space-y-4">
        {Object.entries(graph).map(([key, value]) => (
          <div key={key} className="mt-2">
            <p className="text-foreground font-semibold capitalize">{key}:</p>
            {renderGraphSection(value)}
          </div>
        ))}
      </div>
    );
  };

  const renderGraphSection = (section) => {
    if (typeof section === 'string') {
      return <p className="text-muted-foreground">{section}</p>;
    } else if (Array.isArray(section)) {
      return (
        <ul className="list-disc list-inside text-muted-foreground">
          {section.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else if (typeof section === 'object') {
      return (
        <div className="pl-4">
          {Object.entries(section).map(([key, value]) => (
            <div key={key}>
              <p className="text-foreground font-semibold">{key}:</p>
              {renderGraphSection(value)}
            </div>
          ))}
        </div>
      );
    }
  };



  return (
    <div className={`h-full overflow-auto ${theme === 'dark' ? 'bg-[#23252F]' : 'bg-white'} p-4`}>
      <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
      {itemType === "Blockchain" && renderBlockchainDescription(selectedItem)}
      {itemType === "Sector" && (
        <p className="text-muted-foreground">
          This sector contains {selectedItem.children ? selectedItem.children.length : 0} roles.
        </p>
      )}
      {itemType === "Role" && (
        <p className="text-muted-foreground">
          This role contains {selectedItem.children ? selectedItem.children.length : 0} actors.
        </p>
      )}
      {itemType === "Actor" && (
          <div>
            <p className="text-muted-foreground">{selectedItem.description || "No description available."}</p><br/>
            {selectedItem.flag_midnight == 1 ? <p className="text-red" ><strong>Flagged for Midnight</strong><br/><br/></p>: <br/>}
            {selectedItem.x || selectedItem.youtube || selectedItem.discord ? <strong>Social Media</strong> : <br/>}
              {selectedItem.x ? <p className="text-muted-foreground">{selectedItem.x} ({selectedItem.x_reach})</p> : <span/>}
            {selectedItem.youtube ? <p className="text-muted-foreground">{selectedItem.youtube} ({selectedItem.youtube_reach})</p> : <span/>}
            {selectedItem.discord ? <p className="text-muted-foreground">{selectedItem.discord} ({selectedItem.discord_reach})</p> : <span/>}
            <br/>
              {selectedItem.www || selectedItem.email || selectedItem.phone || selectedItem.linkedin || selectedItem.location ||selectedItem.geography ?
            <strong>Address Details</strong> : <br/>}
            {selectedItem.www ? <p className="text-muted-foreground">WWW : {selectedItem.www}</p> : <span/>}
            {selectedItem.email ? <p className="text-muted-foreground">Email : {selectedItem.email}</p> : <span/>}
            {selectedItem.phone ? <p className="text-muted-foreground">Phone : {selectedItem.phone}</p> : <span/>}
            {selectedItem.linkedin ? <p className="text-muted-foreground">LinkedIn : {selectedItem.linkedin}</p> : <span/>}
            {selectedItem.location ? <p className="text-muted-foreground">Location : {selectedItem.location}</p> : <span/>}
            {selectedItem.geography ? <p className="text-muted-foreground">Geography : {selectedItem.geography}</p> : <span/>}
            <br/><br/>
            {selectedItem.score ? <strong>Score ({selectedItem.score})</strong> : <span/>}
            {selectedItem.score_stable ? <table style={{width:'100%'}}><tr><td style={selectedItem.score_stable > -1 & selectedItem.score_stable < 1? {backgroundColor: 'orange'}: selectedItem.score_stable == 1 ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>Stable</td></tr><tr><td className="text-muted-foreground">{selectedItem.comment_stable}</td></tr></table> : <span/>}
            {selectedItem.score_open ? <table style={{width:'100%'}}><tr><td style={selectedItem.score_open > -1 & selectedItem.score_open < 1? {backgroundColor: 'orange'}: selectedItem.score_open == 1 ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>Open</td></tr><tr><td className="text-muted-foreground">{selectedItem.comment_open}</td></tr></table> : <span/>}
            {selectedItem.score_aligned ? <table style={{width:'100%'}}><tr><td style={selectedItem.score_aligned > -1 & selectedItem.score_aligned < 1? {backgroundColor: 'orange'}: selectedItem.score_aligned == 1 ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>Aligned</td></tr><tr><td className="text-muted-foreground">{selectedItem.comment_aligned}</td></tr></table> : <span/>}
            {selectedItem.score_capacity ? <table style={{width:'100%'}}><tr><td style={selectedItem.score_capacity > -1 & selectedItem.score_capacity < 1? {backgroundColor: 'orange'}: selectedItem.score_capacity == 1 ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>Capacity</td></tr><tr><td className="text-muted-foreground">{selectedItem.comment_capacity}</td></tr></table> : <span/>}
            {selectedItem.score_flywheel ? <table style={{width:'100%'}}><tr><td style={selectedItem.score_flywheel > -1 & selectedItem.score_flywheel < 1? {backgroundColor: 'orange'}: selectedItem.score_flywheel == 1 ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>Flywheel</td></tr><tr><td className="text-muted-foreground">{selectedItem.comment_flywheel}</td></tr></table> : <span/>}
            {selectedItem.comment ? <div><br/><br/><h5>Comments</h5><p className="text-muted-foreground">{selectedItem.comment}</p></div> : <span/>}
          </div>
      )}
      {itemType !== "Blockchain" && itemType !== "Sector" && itemType !== "Role" && itemType !== "Actor" && (
        <p className="text-muted-foreground">No information available for this item.</p>
      )}
    </div>
  );
};

export default InformationCard;