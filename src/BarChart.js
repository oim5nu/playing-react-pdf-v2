import React, { useEffect } from 'react';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

const BarChart = ({ data, size }) => {
  let node;
  const createBarChart = (node) => {
    const dataMax = max(data);
    const yScale = scaleLinear().domain([0, dataMax]).range([size[1], 0]);

    select(node)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .data(data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 25)
      .attr('y', (d) => size[1] - yScale(d))
      .attr('height', (d) => yScale(d))
      .attr('width', 25);
  };

  useEffect(() => {
    createBarChart(node);
  });
  return <svg ref={(n) => (node = n)} height="500" width="500" />;
};

export default BarChart;
