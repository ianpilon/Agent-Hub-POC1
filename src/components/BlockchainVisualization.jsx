import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import SearchBar from './SearchBar';
import { useTheme } from "@/components/ThemeProvider";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { baseData } from "../data/base"
import { departmentA } from "../data/departmentA"
import { aircraftManagement } from "../data/aircraftManagement";
import { blockfrost } from "../data/blockfrost";
import { corporateSecurity } from "../data/corporateSecurity";
import { technology } from "../data/technology";
import { research } from "../data/research";
import { product } from "../data/product";
import { peopleTalent } from "../data/peopleTalent";
import { operations } from "../data/operations";
import { midnight } from "../data/midnight";
import { cultureCommunications } from "../data/cultureCommunications";
import { ecosystemCommunity } from "../data/ecosystemCommunity";
import { engineering } from "../data/engineering";
import { executive } from "../data/executive";
import { finance } from "../data/finance";
import { hoskinsonFamilyOffice } from "../data/hoskinsonFamilyOffice";
import { iog } from "../data/iog";
import { legal } from "../data/legal";
import { marketing } from "../data/marketing";
import { unknown } from "../data/unknown";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";


const BlockchainVisualization = ({ onItemSelect }) => {
  const svgRef = useRef(null);
  const [root, setRoot] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showResetButton, setShowResetButton] = useState(false);
  
  // These references will be set within useEffect and used by the zoom functions
  const svgRef2 = useRef(null);
  const gRef = useRef(null);
  const nodeRef = useRef(null);
  const labelRef = useRef(null);
  const viewRef = useRef(null);
  const focusRef = useRef(null);
  const zoomTextRef = useRef(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  
  // Helper function to update zoom indicator text
  const updateZoomIndicator = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
    if (zoomTextRef.current) {
      zoomTextRef.current.text(`Zoom: ${newZoomLevel}x`);
    }
  };

  // Define zoom functions at component level so they're accessible everywhere
  const zoomTo = (v) => {
    if (!gRef.current || !nodeRef.current || !labelRef.current) return;
    
    // Calculate the scale factor for zoom
    const k = Math.min(widthRef.current, heightRef.current) / v[2];

    // Save the current view
    viewRef.current = v;

    // Center the visualization with proper calculations
    const centerX = widthRef.current / 2;
    const centerY = heightRef.current / 2;
    
    // Apply transformation to ensure proper centering
    gRef.current.attr("transform", `translate(${centerX},${centerY})`);
    
    // Update text color based on theme
    labelRef.current.attr("fill", theme === 'dark' ? "hsl(var(--foreground))" : "hsl(var(--foreground))");
    
    // Transform nodes with proper centering
    nodeRef.current.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    nodeRef.current.attr("r", d => d.r * k);
    
    // Always ensure Midnight circles have white stroke after any transform
    ensureMidnightCirclesHaveWhiteStrokes();
    
    // Transform labels with the same calculations
    labelRef.current.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
  };

  const zoom = (event, d) => {
    if (!svgRef2.current || !labelRef.current || !d) return;
    
    // Special highlighting only for search results (not for regular clicking)
    // We can detect a search result by checking if it's called from handleSearch
    // which sets a special property on the event
    if (event.isFromSearch && nodeRef.current) {
      // Remove highlight from previous node if it exists
      if (focusRef.current) {
        nodeRef.current.filter(node => node === focusRef.current)
          // Instead of removing strokes completely, restore them according to theme
          .attr("stroke", theme === 'dark' ? "#FFFFFF" : null)
          .attr("stroke-width", theme === 'dark' ? 1 : null);
      }
      
      // Add bright neon pink highlight to the searched node
      nodeRef.current.filter(node => node === d)
        .attr("stroke", "#FF00FF") // Neon pink color
        .attr("stroke-width", "4px");
    }
    
    const focus0 = focusRef.current;
    focusRef.current = d;

    const transition = svgRef2.current.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          // Use different zoom levels based on whether this is from search or regular click
          let targetRadius;
          if (event.isFromSearch) {
            // For search results, zoom to approximately 5.19x
            targetRadius = focusRef.current.r * 20;
          } else {
            // For regular clicks, use the original zoom behavior
            targetRadius = focusRef.current.r * 2;
          }
          const i = d3.interpolateZoom(viewRef.current, [focusRef.current.x, focusRef.current.y, targetRadius]);
          return t => {
            const v = i(t);
            zoomTo(v);
            // Update zoom level
            // Update zoom level display
            const newZoomLevel = (widthRef.current / v[2]).toFixed(2);
            setZoomLevel(newZoomLevel);
            // Use the updateZoomIndicator function for consistent zoom text updates
            updateZoomIndicator(newZoomLevel);
            // Ensure Midnight strokes after each zoom tween update
            ensureMidnightCirclesHaveWhiteStrokes();
          };
        });

    // Handle labels differently based on whether this is a search result or regular click
    if (event.isFromSearch) {
      // For search results, always show the label
      labelRef.current
        .filter(function(d) { return d === focusRef.current; })
        .transition(transition)
        .style("fill-opacity", 1)
        .style("font-weight", "bold")
        .style("font-size", "14px")
        .style("display", "inline");
    } else {
      // For regular clicks, use the original label behavior
      labelRef.current
        .filter(function(d) { return d.parent === focusRef.current || this.style.display === "inline"; })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focusRef.current ? 1 : 0)
        .on("start", function(d) { if (d.parent === focusRef.current) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focusRef.current) this.style.display = "none"; });
    }
  };

  const resetView = (event) => {
    if (event) event.stopPropagation();
    if (root) {
      // Reset to the initial view
      const initialTransform = d3.zoomIdentity
        .translate(widthRef.current / 2, heightRef.current / 2)
        .scale(1);
      
      // Apply the transform
      gRef.current
        .transition()
        .duration(750)
        .call(
          d3.zoom().transform,
          initialTransform
        );
      
      // Update zoom level
      setZoomLevel(1);
      updateZoomIndicator(1);
      setShowResetButton(false);
    }
  };

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svgRef2.current = svg;
      svg.selectAll("*").remove(); // Clear previous render

      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      widthRef.current = width;
      heightRef.current = height;

      svg.attr("viewBox", [0, 0, width, height])
         .attr("width", "100%")
         .attr("height", "100%")
         .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

      // Add background rectangle
      const backgroundRect = svg.append("rect")
         .attr("width", "100%")
         .attr("height", "100%")
         .attr("fill", "hsl(var(--background))");

      // Define the gradients
      const defs = svg.append("defs");

      // Add drop shadow filter
      const filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

      filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");

      filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", -3)
        .attr("dy", 3)
        .attr("result", "offsetBlur");

      const feComponentTransfer = filter.append("feComponentTransfer")
        .attr("in", "offsetBlur")
        .attr("result", "coloredBlur");

      feComponentTransfer.append("feFuncA")
        .attr("type", "linear")
        .attr("slope", 0.225);
      const feMerge = filter.append("feMerge");

      feMerge.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

      const combinedData = {
        name: "Department Ecosystem",
        children: [
          aircraftManagement,
          blockfrost,
          corporateSecurity,
          cultureCommunications,
          ecosystemCommunity,
          engineering,
          executive,
          finance,
          hoskinsonFamilyOffice,
          iog,
          legal,
          marketing,
          midnight,
          operations,
          peopleTalent,
          product,
          research,
          technology,
          unknown
        ],
      };

      const pack = data => {
        const hierarchy = d3.hierarchy(data)
          .sum(d => d.children ? 0 : 100)
          .sort((a, b) => b.value - a.value);
        
        // Increase padding for better spacing
        const padding = 2.5; // Increased base padding
        hierarchy.eachAfter(node => {
          if (node.depth > 0) {
            // Apply more aggressive padding for deeper nodes
            node.r = Math.max(0, node.r - padding * (node.depth * 0.8));
          }
        });
        
        // Apply the pack layout
        const packed = d3.pack()
          .size([width, height])
          .padding(4) // Increased padding between nodes
          (hierarchy);
          
        return packed;
      };

      const rootNode = pack(combinedData);
      setRoot(rootNode);

      // Extract all nodes for search functionality
      const allNodes = rootNode.descendants();
      const uniqueNodeNames = new Set(allNodes.map(node => node.data.name));
      setSearchData(Array.from(uniqueNodeNames).sort());

      focusRef.current = rootNode;
      // Initialize view as in original code
      viewRef.current = null;

      const color = d3.scaleLinear()
        .domain([0, 5])
        .range(theme === 'dark' ? ["#2a2a2a", "#d0d0d0"] : ["#ffffff", "#f0f0f0"])
        .interpolate(d3.interpolateHcl);

      const g = svg.append("g");
      gRef.current = g;

      const darkModeColors = [
        "#444B64",  // Darkest shade for depth 1 (blockchain parent circles)
        "#505773",
        "#5D6482",
        "#6B7291",
        "#7D84A2",
        "#9399B2",  // Lightest shade for depth 6 or more (sectors and beyond)
      ];
      const node = g.selectAll("circle")
        .data(rootNode.descendants().slice(1))
        .join("circle")
          .attr("fill", d => getNodeColor(d))
          .attr("stroke", theme === 'dark' ? "#FFFFFF" : d => d.depth === 2 ? "#e0e0e0" : null)
          .attr("stroke-width", 1)
          .attr("stroke-opacity", theme === 'dark' ? 1 : 0.7)
          .attr("pointer-events", "all")
          .attr("filter", d => d.depth === 1 ? "url(#drop-shadow)" : null)
          .on("mouseover", function() { 
            if (theme === 'dark') {
              d3.select(this).attr("stroke", "#FFFFFF").attr("stroke-width", 2);
            } else {
              d3.select(this).attr("stroke", "#c0c0c0");
            }
          })
          .on("mouseout", function(event, d) {
            if (theme === 'dark') {
              d3.select(this).attr("stroke", "#FFFFFF").attr("stroke-width", 1);
            } else {
              d3.select(this).attr("stroke", d.depth === 2 ? "#e0e0e0" : null);
            }
            setTimeout(() => ensureMidnightCirclesHaveWhiteStrokes(), 10);
          })
          .on("click", (event, d) => {
            onItemSelect(d.data);
            let targetNode = d;
            if (!d.children) {
              targetNode = d.parent;
            }
            zoom(event, targetNode);
            event.stopPropagation();
          });
      nodeRef.current = node;
      
      const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(rootNode.descendants())
        .join("text")
          .style("fill-opacity", d => d.parent === rootNode ? 1 : 0)
          .style("display", d => d.parent === rootNode ? "inline" : "none")
          .style("font", d => {
            if (d.depth === 1) return "bold 16px sans-serif";
            if (d.depth === 2) return "12px sans-serif"; // Increase size for sector labels
            return d.children ? "10px sans-serif" : "14px sans-serif";
          })
          .attr("dy", "0.35em")
          .attr("fill", d => {
            if (theme === 'dark') {
              return "hsl(var(--foreground))"; // Text color for dark mode from theme
            } else {
              // Light mode text colors
              if (d.depth === 1) {
                return "hsl(var(--primary))"; // Primary color for department labels
              } else {
                return "hsl(var(--foreground))"; // Normal text color for others
              }
            }
          })
          .text(d => {
            if (d.data.name && d.data.name.length > 0) {
              // Special handling for Technology department which has many overlapping names
              const isTechnologyDept = d.parent && d.parent.data && 
                (d.parent.data.name === 'Technology' || 
                 (d.parent.parent && d.parent.parent.data && 
                  d.parent.parent.data.name === 'Technology'));
              
              // Display abbreviated names for employees in Technology department
              if (!d.children) { // For leaf nodes (employees)
                if (isTechnologyDept) {
                  // For Technology department, show first name and last initial
                  const nameWords = d.data.name.split(' ');
                  if (nameWords.length > 1) {
                    return `${nameWords[0]} ${nameWords[nameWords.length-1].charAt(0)}.`;
                  }
                }
                return d.data.name; // Full name for other departments
              }
              
              // Use abbreviations for non-leaf nodes
              const nameWords = d.data.name.split(' ');
              return nameWords.length > 1 ? `${nameWords[0]} ${nameWords[1].charAt(0)}.` : nameWords[0];
            }
            return "";
          });

      labelRef.current = label;

      // Original click behavior - simply zoom to root when clicking background
      svg.on("click", (event) => zoom(event, rootNode));

      // Initial zoom as in original code
      zoomTo([focusRef.current.x, focusRef.current.y, focusRef.current.r * 2]);
      
      // Force Midnight stroke styles after initial render
      ensureMidnightCirclesHaveWhiteStrokes();

      // Create zoom level indicator text in bottom right corner
      // Use the existing width and height variables
      
      const zoomLevelText = svg.append("text")
        .attr("x", widthRef.current - 90) // Position from right edge
        .attr("y", heightRef.current - 15) // Position from bottom edge
        .attr("text-anchor", "start")
        .attr("fill", theme === 'dark' ? "hsl(var(--foreground))" : "hsl(var(--foreground))")
        .attr("font-size", "14px")
        .attr("font-family", "var(--font-sans)")
        .text(`Zoom: ${zoomLevel}x`);

      // Store reference to zoom text
      zoomTextRef.current = zoomLevelText;

      // Disable the built-in zoom and drag behavior completely
      // Instead, we'll use our custom zoom functions to control the visualization
      // This prevents the unintended shifting when using two-finger drag
      
      // We don't need d3.zoom behavior since we have our custom zoom
      // functions that work with our circular packing visualization

      // Initial zoom level
      setZoomLevel(1.00);
      
      // Final check to ensure Midnight strokes are applied
      ensureMidnightCirclesHaveWhiteStrokes();
    }
  }, [theme]); // Add theme as a dependency

  const handleSearch = (searchTerm) => {
    if (root) {
      const node = root.descendants().find(n => n.data.name.toLowerCase() === searchTerm.toLowerCase());
      if (node) {
        // Trigger zoom to the found node
        zoom({ isFromSearch: true }, node);
        // Highlight the node
        if (nodeRef.current) {
          nodeRef.current.filter(d => d === node)
            .attr("stroke", "#FF00FF")
            .attr("stroke-width", "4px");
        }
        return true;
      }
    }
    return false;
  };

  const handleClearSearch = () => {
    // Clear any search highlights
    if (nodeRef.current) {
      nodeRef.current
        .attr("stroke", theme === 'dark' ? "#FFFFFF" : d => d.depth === 2 ? "#e0e0e0" : null)
        .attr("stroke-width", 1);
    }
    // Reset the view if needed
    if (showResetButton) {
      resetView();
    }
  };

  const handleAgentWorkflow = (workflow) => {
    console.log("Selected workflow:", workflow);
    if (workflow === 'Show me the Actors most likely to use NIGHT token') {
      highlightActors();
      setToastMessage('Results: These are the Actors most likely to use NIGHT token.');
    } else if (workflow === 'Show the highest social influence Actors') {
      highlightGalxeNodes();
      setToastMessage('Results: These are the Actors who scored the highest against social influence attributes.');
    }
    setShowToast(true);
    setShowRefreshButton(true);
    setActiveWorkflow(workflow);
    setIsDropdownOpen(false);
  };

  const highlightActors = () => {
        let actors = ['Hosky', 'Project Catalyst', 'Lido Nation', 'Able Pool', 'MMKR', 'Eystein Harsen', 'Summon', 'Lema', 'Drip Dropz Lloyd Duhon', 'ADA Whale', 'PORT', 'AXO', 'Clay Nation', 'NMKR', 'DC Spark', 'HashCash Consultants', 'Cardano Cube', 'Blaize', 'Jump Crypto', 'Justin Ðrake', 'Parity Technologies', 'OOOO', 'WAN Chain', 'EverClear (was connext) ', 'WMT', 'Karl Floersch', 'Marek Olszewski', 'Sergey Nazarov', 'Robert Leshner', 'Rune Christensen', 'Lucas Macchiavell', 'Adam Dean', 'Ryan Williams', 'IAmX', 'ChainSafe Systems', 'OpenZeppelin', 'Set Labs', '1inch Network', 'TX Pipe', 'Arweave', 'Genius Yield', 'Newm', 'ORCFAX', 'Fireblocks', 'OpenOcean', 'PinkSale', 'Streamflow', 'Snowflake', 'ConsenSys', 'Drip Dropz', 'ADA Mail', 'Moonbeam', 'ALCHEMY', 'CHAINLINK', 'FIREBLOCKS', 'QUICKNODE', 'THIRDWEB', '4EVERLAND', 'Tatum', 'thirdweb', 'Civic', 'Human Protocol', 'Web3Auth', 'Umbrella Network', 'Kudelski Security', 'Halborn', 'Transak', 'Magic', 'Moralis', 'Lace', 'Liqwid', 'Alchemy', 'Paima Studio', 'Mobilunity', 'MLabs', 'Sundaeswap', 'MinSwap', 'IAMX Collabs', 'Ada Handle', 'Fungible Systems', 'CodePoets', 'Metaplex', 'Solanium', 'Andreas Antonopoulos', 'Adam Rusch', 'Nick Johnson (nick.eth)', 'Kraken', 'Aya Miyaguchi (ayamiya.eth)', 'LenFi', 'USDM', 'Hayden Adams', 'Stani Kulechov', 'Kain Warwick', 'Tomasz K. Stańczak', 'CIVIC', 'CryptoWendy', 'Helena', 'James Hancock', 'Kartik Talwar', 'Lion ⟠ dapplion.eth', 'Paris Rouzati', 'timbeiko.eth', 'Sheldon Evans', 'Abhik Nag', 'Protolambda (proto.eth)', 'Hsiao-Wei Wang', 'Army of Spies', 'Rick McCracken', 'Chainway Labs', 'ZeroSync', 'Intersect', 'Alchemy', 'BitcoinL2Labs', 'DegenLab', 'Mechanism', 'Zondax', 'GALXE', 'Chain', 'QuickNode', 'Aleph.im', 'Arweave', 'Lit Protocol', 'Spheron', 'Pyth', 'Wormhole', 'Chainlink', 'Bitcoin Startup Lab', 'Spiral', 'Bitcoin Frontier Fund', 'SNEK', 'WORMHOLE', 'Starch Industries', 'Avolox', 'JPG Store', 'Conuchias', 'Book.io', 'Labrys', 'ChainLink', 'Chris Dixon (cdixon)', 'Infura', 'IAGON', 'Biconomy', 'ENCOIN', 'CertiK', 'Péter Szilágyi (karalabe.eth)', 'Chainsafe.io', 'Preston Van Loon (prestonvanloon.eth)', 'VYFinance', 'Indigo', 'Blockfrost', 'Alchemy', 'QuickNode', 'Blockdaemon', 'CoinFabrik', 'ZK FOLD', 'Optim Finance', 'Cardano Spot', 'LIDO Pools', 'ECP (Earn Coin Pool)', 'Stake with pride', 'Butane', 'William Entriken', 'SOC', 'Lighthouse', 'Pantera Capital', 'Eternl', 'Exodus', 'Vesper', 'Martin (Atada)', 'Mike Horwat', 'Oxford Blockchain', 'Mike Horwat', 'Weavechain.com', 'Fireblocks'];

    d3.select(svgRef.current)
      .selectAll("circle")
      .filter(d => actors.includes(d.data.name))
      .transition()
      .duration(500)
      .attr("fill", "rgb(0, 255, 0)");
  };

  const highlightGalxeNodes = () => {
    let actors = ['ADA Whale','CryptoWendy','Andreas Antonopoulos','MMKR','Project Catalyst','Abhik Nag','Adam Dean','Army of Spies','Cardano Cube','Cardano Spot','Hosky','Lido Nation','Rick McCracken','Helena','James Hancock','Kartik Talwar','Lion ⟠ dapplion.eth','Paris Rouzati','timbeiko.eth','Aya Miyaguchi (ayamiya.eth)','Chris Dixon (cdixon)','Karl Floersch','Preston Van Loon (prestonvanloon.eth)','Protolambda (proto.eth)','Tomasz K. Stańczak','Justin Ðrake','Hsiao-Wei Wang','Nick Johnson (nick.eth)','Sheldon Evans']
        d3.select(svgRef.current)
          .selectAll("circle")
          .filter(d => actors.includes(d.data.name))
          .transition()
          .duration(500)
          .attr("fill", "rgb(255, 105, 180)"); // Bright pink color
      };

  const highlightLighthouseNodes = () => {
    let actors = ['ADA Whale','GALXE','Exodus','MIT Digital Currency Initiative','BitMex']
    d3.select(svgRef.current)
      .selectAll("circle")
      .filter(d => actors.includes(d.data.name))
      .transition()
      .duration(500)
      .attr("fill", "rgb(229, 255, 0)"); // Neon yellow color
  };

  const resetHighlight = () => {
    d3.select(svgRef.current)
      .selectAll("circle")
      .transition()
      .duration(500)
      .attr("fill", d => getNodeColor(d));
    ensureMidnightCirclesHaveWhiteStrokes();
    setShowRefreshButton(false);
    setActiveWorkflow(null);
    setShowToast(false);
    forceWhiteStrokesOnMidnight();
  };

  // Function to ensure all Midnight circles have white stroke in any mode
  // Disabled: ensure uniform stroke widths across all nodes
const ensureMidnightCirclesHaveWhiteStrokes = () => {
    if (!nodeRef.current) return;
    
    // Apply to ALL circles regardless of mode for consistent styling
    nodeRef.current.each(function(d) {
      // Check for Midnight department nodes at all depths
      if (d.data && (
          // Is the Midnight department itself
          d.data.name === 'Midnight' ||
          // Has flag_midnight set to 1 
          d.data.flag_midnight === '1' ||
          // Is a subdepartment of Midnight
          (d.data.name && ['Architecture', 'Engineering', 'Cryptography', 'Research'].includes(d.data.name) && 
           d.parent && d.parent.data && d.parent.data.name === 'Midnight') ||
          // Is a child of a Midnight subdepartment
          (d.parent && d.parent.data && 
           d.parent.parent && d.parent.parent.data && 
           d.parent.parent.data.name === 'Midnight')
        )) {
        // Make sure these specific nodes ALWAYS have a clear white stroke regardless of theme
        d3.select(this)
          .attr("stroke", "#FFFFFF")
          .attr("stroke-width", 1)
          .attr("stroke-opacity", 1.0);
      }
    });
  };

  // Function to determine node color based on depth and theme
  function getNodeColor(d) {
    if (theme === 'dark') {
      // Dark theme colors - using our theme system
      if (d.depth === 1) return "hsl(var(--secondary))"; // Departments
      if (d.depth === 2) return "hsl(var(--secondary-foreground) / 0.2)"; // Sub-departments
      if (d.depth === 3) return "hsl(var(--secondary) / 0.85)"; // Teams
      if (!d.children) return "hsl(var(--secondary) / 0.7)"; // Individual employees
      return "hsl(var(--secondary) / 0.5)";
    } else {
      // Light theme colors - using our theme system
      if (d.depth === 1) return "hsl(var(--secondary))"; // Departments
      if (d.depth === 2) return "hsl(var(--secondary) / 0.9)"; // Sub-departments
      if (d.depth === 3) return "hsl(var(--secondary) / 0.8)"; // Teams
      if (!d.children) return "hsl(var(--secondary) / 0.7)"; // Individual employees
      return "hsl(var(--secondary) / 0.5)";
    }
  }
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <SearchBar 
          data={searchData} 
          onSearch={handleSearch} 
          onClear={handleClearSearch}
        />
      </div>
      <div className="w-full h-full rounded-lg relative bg-background">
        <svg ref={svgRef} className="w-full h-full relative z-10"></svg>
        
        {/* Reset Zoom Button */}
        {showResetButton && (
          <button
            onClick={resetView}
            className="absolute bottom-4 right-4 z-20 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md shadow-md border border-gray-200 dark:border-gray-600 flex items-center gap-2 transition-colors"
            title="Reset view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Reset View
          </button>
        )}
        
        {/* AI Agents Dropdown and Refresh Button */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center">
          <div className="relative mr-2">
          <button
  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  className={cn(
    buttonVariants({ variant: "secondary" }),
    "w-full justify-start text-left font-normal",
    !isDropdownOpen && "text-secondary-foreground"
  )}
>
  <span>Run AI Agents</span>
  <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
</button>
{isDropdownOpen && (
  <Card className="absolute bottom-full left-0 mb-2 w-48 bg-card text-card-foreground border-border">
    <CardContent className="p-0">
      <Command className="bg-transparent">
        <CommandInput placeholder="Search AI agents..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="AI Agents">
            {['Show me the Actors most likely to use NIGHT token', 'Show the highest social influence Actors'].map((workflow, index) => (
              <CommandItem
                key={index}
                onSelect={() => handleAgentWorkflow(workflow)}
              >
                {workflow}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CardContent>
  </Card>
)}
          </div>
          {showRefreshButton && (
  <button
    onClick={resetHighlight}
    className={cn(
      buttonVariants({ variant: "secondary" }),
      "text-secondary-foreground"
    )}
  >
    Refresh
  </button>
)}
        </div>
      </div>
    </div>
  );
};

export default BlockchainVisualization;
