import React, { useState, useEffect } from 'react';
import { data, SVGComponent, PdfDocument } from './PdfDocument';
import { Button } from '@material-ui/core';
import WorldMap from './WorldMap';
import BarChart from './BarChart';
import ReactPDF, {
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import worlddata from './world';
import CanvasChart from './Chart';

let chartData = [
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

const App = () => {
  const [ready, setReady] = useState(false);

  // this is hacky but helps set the render to the back of event queue https://github.com/diegomura/react-pdf/issues/420
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
    return () => setReady(false);
  }, []);

  if (!ready) {
    return null;
  } else {
    return (
      <>
        {/* <PDFDownloadLink document={<PdfDocument />} fileName="aName.pdf">
          {({ url, loading, error }) => {
            if (loading) return 'Generating document...';

            if (!loading && url) return 'Download document';

            if (error) {
              console.error(error);
              return <p>An error occurred</p>;
            }

            return null;
          }}
        </PDFDownloadLink> */}
        <PDFViewer>
          <PdfDocument />
        </PDFViewer>
        {/* <BarChart data={[5, 10, 1, 3]} size={[500, 500]} /> */}
        <WorldMap />
        {/* <SVGComponent /> */}
        {/* <BarChart data={appdata} size={[200, 200]} /> */}
        {/* <img src={`data:image/jpeg;base64,${data}`} /> */}
        <CanvasChart data={chartData} width={800} heigth={800} />
      </>
    );
  }
  // return (
  //   <div>
  //     {/* <BlobProvider document={MyDoc}>
  //       {({ blob, url, loading, error }) => {
  //         return <div>There's something going on on the fly</div>;
  //       }}
  //     </BlobProvider> */}
  //     {/* <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={() => {
  //         ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
  //       }}
  //     >
  //       Test
  //     </Button> */}

  //     {/* <PDFViewer>
  //       <MyDocument />
  //     </PDFViewer> */}

  //     {/* {
  //       <PDFDownloadLink document={MyDocument} fileName="somename.pdf">
  //         {({ blob, url, loading, error }) => {
  //           console.log(loading);
  //           return loading ? 'Loading document...' : 'Download now!';
  //         }}
  //       </PDFDownloadLink>
  //     } */}
  //   </div>
  // );
};

export default App;
