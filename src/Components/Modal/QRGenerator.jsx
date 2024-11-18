import { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toCanvas } from 'html-to-image';

const QRGenerator = ({ allOrders, CheckOUtss, TotalsAll }) => {
    const qrRef = useRef(null);

    const handleDownloadQRCode = async (e) => {
        e.preventDefault();
        if (qrRef.current === null) return;

        try {
            // Create a temporary container
            const container = document.createElement('div');
            container.style.background = 'white';
            container.style.padding = '20px';
            container.style.width = 'fit-content';
            
            // Create a temporary element for the QR code
            const qrContainer = document.createElement('div');
            container.appendChild(qrContainer);
            document.body.appendChild(container);

            // Clone the SVG
            const svg = qrRef.current.querySelector('svg');
            if (svg) {
                const svgClone = svg.cloneNode(true);
                qrContainer.appendChild(svgClone);

                // Convert to canvas with options to suppress font errors
                const canvas = await toCanvas(container, {
                    skipFonts: true,
                    filter: (node) => {
                        // Properly check for node type and className
                        if (node.tagName === 'LINK') return false;
                        if (node.className && typeof node.className === 'string' && 
                            node.className.includes('google')) return false;
                        return true;
                    },
                    backgroundColor: '#ffffff'
                });
                
                // Clean up the temporary elements
                document.body.removeChild(container);

                // Convert canvas to blob and download
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'qrcode.png';
                        link.click();
                        // Clean up
                        URL.revokeObjectURL(url);
                    }
                }, 'image/png', 1.0);
            }

              CheckOUtss(e,TotalsAll);

        } catch (err) {
            console.error('Failed to download QR code:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 backdrop-blur-sm animate-fadeIn z-30">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl animate-slideIn overflow-hidden">
                <div className="p-5 relative">
                 

                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Generated QRCODE
                            </h1>
                            <p className="mt-1 text-gray-500">
                                Please download this qrcode
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <h3>QR Code:</h3>
                            <div ref={qrRef} className="bg-white p-4">
                                <QRCode 
                                    value={JSON.stringify(allOrders)} 
                                    size={150}
                                    style={{ background: 'white' }}
                                />
                            </div>
                            <button
                                onClick={(e) => handleDownloadQRCode(e)}
                                className="mt-2 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Download QR Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRGenerator;