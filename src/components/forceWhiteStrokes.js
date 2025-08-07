// Helper utility to force white strokes on all Midnight circles
import * as d3 from 'd3';

export function forceWhiteStrokesOnAllCircles(nodeRef, theme) {
  if (!nodeRef || !nodeRef.current) return;
  
  if (theme === 'dark') {
    // Apply solid white stroke to ALL circles in dark mode with no exceptions
    nodeRef.current.attr("stroke", "#FFFFFF")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 2);
  }
}

// Special function to force white strokes specifically for Midnight department
export function forceMidnightWhiteStrokes(nodeRef, theme) {
  if (!nodeRef || !nodeRef.current) return;
  
  if (theme === 'dark') {
    // First apply light stroke to all
    nodeRef.current.attr("stroke", "#FFFFFF")
      .attr("stroke-opacity", 0.7)
      .attr("stroke-width", 1);
    
    // Then specifically target Midnight circles with stronger stroke
    nodeRef.current.each(function(d) {
      if (d && d.data) {
        // Check all possible conditions for Midnight connection
        const isMidnightRelated = 
          // Is Midnight department itself
          (d.data.name === 'Midnight') || 
          // Has Midnight flag
          (d.data.flag_midnight === '1') ||
          // Is a subdept of Midnight
          (d.data.name === 'Architecture' || d.data.name === 'Engineering' || 
           d.data.name === 'Cryptography' || d.data.name === 'Research') ||
          // Has Midnight parent
          (d.parent && d.parent.data && d.parent.data.name === 'Midnight') ||
          // Has parent with midnight flag
          (d.parent && d.parent.data && d.parent.data.flag_midnight === '1') ||
          // Has grandparent that is Midnight
          (d.parent && d.parent.parent && d.parent.parent.data && 
           d.parent.parent.data.name === 'Midnight');
        
        if (isMidnightRelated) {
          d3.select(this)
            .attr("stroke", "#FFFFFF")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 2.5);
        }
      }
    });
  }
}
