import { useRef, useState, useEffect } from 'react';
import { FaQrcode, FaDownload } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { toCanvas } from 'html-to-image';

const ModernQRGenerator = ({ allOrders, CheckOUtss, TotalsAll, allDatas,Refresh }) => {

    const displayDiscount = JSON.parse(localStorage.getItem("Discount"));

    const qrRef = useRef(null);
    const [newArray, setNewArray] = useState([]);
  
    useEffect(() => {
        const updatedArray = allOrders.map(pro => ({
            id: pro.id,
            product_Name: pro.product_Name,
            picture: pro.picture,
            size: pro.size,
            startDate: pro.start_Date,
            returnDate: pro.return_Date,
            user_ID: pro.user_ID,
            subTotal: pro.subTotal,
        }));
        setNewArray(updatedArray);
    }, [allOrders]);

   


    const formatDataForQRCode = (data, total) => {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const DATEOFNOW = currentDate.toLocaleDateString('en-US', options);

        const header = `🏷️ CRISTOBAL COLLECTIONS 🏷️
            ORDER DETAILS

            Customer: ${allDatas[0].name}
            Address: ${allDatas[0].address}
            Date Issued: ${DATEOFNOW}\n`;
                    
                    const itemsDetails = data.map(item => {
                        const Start = new Date(item.startDate);
                        const End = new Date(item.returnDate);
                        const Starto = Start.toLocaleDateString('en-US', options);
                        const Endo = End.toLocaleDateString('en-US', options);
                    return (
                            `--------------------
            📦 ITEM DETAILS
            Rental ID: ${item.id}
            Product: ${item.product_Name}
            Size: ${item.size}
            Rental Period:
            Start: ${Starto}
            Return: ${Endo}
            Subtotals: ${item.subTotal}
            `
                        )
                    }).join('\n\n');

        return `${header}\n${itemsDetails}\n\n💰 TOTAL: ₱${total.toFixed(2)}`;
    };


    const handleDownloadQRCode = async (e) => {
        e.preventDefault();
        if (qrRef.current === null) return;

        try {
            const container = document.createElement('div');
            container.style.background = 'white';
            container.style.padding = '20px';
            container.style.width = 'fit-content';

            const qrContainer = document.createElement('div');
            container.appendChild(qrContainer);
            document.body.appendChild(container);

            const svg = qrRef.current.querySelector('svg');
            if (svg) {
                const svgClone = svg.cloneNode(true);
                qrContainer.appendChild(svgClone);

                const canvas = await toCanvas(container, {
                    skipFonts: true,
                    filter: (node) => {
                        if (node.tagName === 'LINK') return false;
                        if (node.className && typeof node.className === 'string' && node.className.includes('google')) return false;
                        return true;
                    },
                    backgroundColor: '#ffffff'
                });

                document.body.removeChild(container);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'cristobal-collection-qr.png';
                        link.click();
                        URL.revokeObjectURL(url);
                    }
                }, 'image/png', 1.0);
            }

            CheckOUtss(e, TotalsAll);
            
            if (displayDiscount) {
                Refresh(e);
              }
              

        } catch (err) {
            console.error('Failed to download QR code:', err);
        }
    };

    return (
        <div className="fixed inset-0  flex items-center justify-center p-3 backdrop-blur-md z-30">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 transform transition-all hover:scale-[1.02] duration-300 ease-in-out">
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <FaQrcode className="w-10 h-10 text-blue-600 mr-2" />
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                QR Code Generator
                            </h1>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Scan or download your Cristobal Collections order details
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-md">
                            <QRCode 
                                value={formatDataForQRCode(newArray, TotalsAll)} 
                                size={200}
                                fgColor="#1E40AF"  // Deep blue color
                                style={{ 
                                    background: 'white', 
                                    borderRadius: '12px', 
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                                }}
                            />
                        </div>
                        <button
                            onClick={(e) => handleDownloadQRCode(e)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <FaDownload className="w-5 h-5" />
                            Download QR Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernQRGenerator;