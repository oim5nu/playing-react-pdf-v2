import * as d3 from 'd3';

const CANVAS = { WIDTH: 800, HEIGHT: 500 };
const MARGIN = { TOP: 20, RIGHT: 20, BOTTOM: 30, LEFT: 40 };
const WIDTH = CANVAS.WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = CANVAS.HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

let data = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
];

export default class CanvasBarChart {
  constructor(element) {
    const vis = this;

    vis.canvas = d3
      .select(element)
      .append('canvas')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

    const context = vis.canvas.getContext('2d');

    let x = d3.scaleBand().rangeRound([0, WIDTH]).padding(0.1);

    let y = d3.scaleLinear().rangeRound([HEIGHT, 0]);

    context.translate(MARGIN.LEFT, MARGIN.LEFT);

    x.domain(data.map((d) => d.letter));
    y.domain([0, d3.max(data, (d) => d.frequency)]);

    let yTickCount = 10,
      yTicks = y.ticks(yTickCount),
      yTickFormat = y.tickFormat(yTickCount, '%');

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
    context.lineTo(0.5, HEIGHT + 0.5);
    context.lineTo(-6.5, HEIGHT + 0.5);
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
        HEIGHT - y(d.frequency)
      );
    });
  }
}

// const CanvasChart = ({ data }) => {

// }
