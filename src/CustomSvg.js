import React from 'react';
import { Canvas } from '@react-pdf/renderer';
import ReactDOMServer, { renderToStaticMarkup } from 'react-dom/server';
import SVGToPDFKit from 'svg-to-pdfkit';

function svgishToString(svg) {
  if (React.isValidElement(svg)) {
    return ReactDOMServer.renderToStaticMarkup(svg);
  } else if (typeof svg === 'string') {
    return svg;
  } else {
    return svg.innerHTML;
  }
}

export function Svg({
  svg,
  children,
  width,
  height,
  assumePt = true,
  aspectRatio = ['xMidYMid', 'meet'],
  ...props
}) {
  const source = React.useMemo(() => svgishToString(children || svg), [
    children,
    svg,
  ]);

  return (
    <Canvas
      style={{ height, width }}
      {...props}
      paint={(_, width, height, root) => {
        SVGToPDFKit(root, source, 0, 0, {
          width,
          height,
          assumePt,
          preserveAspectRatio: aspectRatio.join(' '),
        });
      }}
    />
  );
}
