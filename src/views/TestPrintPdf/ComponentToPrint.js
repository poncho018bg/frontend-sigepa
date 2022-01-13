import React,{useState} from "react";
import '../Formio/assets/index.scss';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export const ComponentToPrint = React.forwardRef((props, ref) => {
    const fileContent = 'data:application/pdf;base64,' + (props.documenb64 === null ? ' ' : props.documenb64);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setPageNumber(numPages);
    }

    return (
        <div ref={ref} >
               {console.log('DOCUMENT PDF =>',fileContent)}
               {console.log('text PDF =>',props)}
               {console.log('text PDF =>',props?.documenb64)}
            <Document file={fileContent}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    );
});