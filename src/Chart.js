import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

// const CANVAS = { WIDTH: 800, HEIGHT: 500 };
// const MARGIN = { TOP: 20, RIGHT: 20, BOTTOM: 30, LEFT: 40 };
// const WIDTH = CANVAS.WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
// const HEIGHT = CANVAS.HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

const CanvasChart = (props) => {
  const canvasRef = useRef(null);
  const data = props.data;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = canvas.width - margin.left - margin.right,
      height = canvas.height - margin.top - margin.bottom;

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);

    let y = d3.scaleLinear().rangeRound([height, 0]);

    context.translate(margin.left, margin.top);

    x.domain(data.map((d) => d.letter));
    y.domain([0, d3.max(data, (d) => d.frequency)]);

    let yTickCount = 10,
      yTicks = y.ticks(yTickCount),
      yTickFormat = y.tickFormat(yTickCount, '%');

    context.beginPath();
    x.domain().forEach((d) => {
      context.moveTo(x(d) + x.bandwidth() / 2, height);
      context.lineTo(x(d) + x.bandwidth() / 2, height + 6);
    });
    context.strokeStyle = 'black';
    context.stroke();

    context.textAlign = 'center';
    context.textBaseline = 'top';
    x.domain().forEach((d) => {
      context.fillText(d, x(d) + x.bandwidth() / 2, height + 6);
    });

    context.beginPath();
    yTicks.forEach((d) => {
      context.moveTo(0, y(d) + 0.5);
      context.lineTo(-6, y(d) + 0.5);
    });
    context.strokeStyle = 'black';
    context.stroke();

    context.textAlign = 'right';
    context.textBaseline = 'middle';
    yTicks.forEach((d) => {
      context.fillText(yTickFormat(d), -9, y(d));
    });

    context.beginPath();
    context.moveTo(-6.5, 0 + 0.5);
    context.lineTo(0.5, 0 + 0.5);
    context.lineTo(0.5, height + 0.5);
    context.lineTo(-6.5, height + 0.5);
    context.strokeStyle = 'black';
    context.stroke();

    context.save();
    context.rotate(-Math.PI / 2);
    context.textAlign = 'right';
    context.textBaseline = 'top';
    context.font = 'bold 10px sans-serif';
    context.fillText('Frequency', -10, 10);
    context.restore();

    context.fillStyle = 'steelblue';
    data.forEach((d) => {
      context.fillRect(
        x(d.letter),
        y(d.frequency),
        x.bandwidth(),
        height - y(d.frequency)
      );
    });
  }, []);

  return <canvas width={props.width} height={props.height} ref={canvasRef} />;
};

export default CanvasChart;
