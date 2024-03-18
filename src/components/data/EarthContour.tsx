import { useEffect, useRef } from "react";
import * as d3 from "d3";

const EarthContour: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Create a geo projection
    const projection = d3
      .geoOrthographic()
      .scale(300)
      .translate([width / 2, height / 2]);

    // Define a geo path generator
    const path = d3.geoPath().projection(projection);

    // Append a path for the Earth
    svg
      .append("path")
      .datum({ type: "Sphere" })
      .attr("d", path as any)
      .attr("fill", "lightblue")
      .attr("stroke", "black");

    // Append a path for the graticule (grid of meridians and parallels)
    svg
      .append("path")
      .datum(d3.geoGraticule10())
      .attr("d", path)
      .attr("stroke", "#000")
      .attr("fill", "none");
  }, []);

  return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default EarthContour;
