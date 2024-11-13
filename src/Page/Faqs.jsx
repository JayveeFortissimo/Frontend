import { useState } from 'react';
import { FiPlus, FiMinus, FiAlertCircle } from 'react-icons/fi';

const Faqs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen px-5 py-8 flex justify-center">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 pb-8 border-b">
          <h1 className="text-3xl font-bold text-gray-800">FAQs</h1>
          <p className="text-sm text-gray-600 text-center max-w-lg">
            Find answers to our most frequently asked questions below. If you can't find 
            what you're looking for, please contact us, and we'll get in touch within 24 hours.
          </p>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-8 flex flex-col gap-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <p className="font-semibold text-gray-800">{item.question}</p>
                <span className="text-gray-600">
                  {openFAQ === index ? (
                    <FiMinus size={20} />
                  ) : (
                    <FiPlus size={20} />
                  )}
                </span>
              </div>
              {openFAQ === index && (
                <div className="bg-gray-50 p-4 text-sm text-gray-600 space-y-3 border-t">
                  {item.answer.map((answer, idx) => (
                    <p key={idx}>{answer}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Policies Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Policies</h2>

          {/* Cancellation Policy */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertCircle className="text-red-500" size={20} />
              <h3 className="font-semibold text-lg">Cancellation Policy</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• 50% deduction from down payment or full payment for cancellations</p>
              <p>• Cancellations must be approved by admin</p>
              <p>• No refunds for cancellations after admin approval deadline</p>
            </div>
          </div>

          {/* Late Return Policy */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertCircle className="text-orange-500" size={20} />
              <h3 className="font-semibold text-lg">Late Return Policy</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• ₱500 charge per day for late returns</p>
              <p>• Late fees are calculated from the day after due date</p>
              <p>• No grace period for returns</p>
            </div>
          </div>

          {/* Damage Policy */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertCircle className="text-yellow-500" size={20} />
              <h3 className="font-semibold text-lg">Damage Policy</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Minor wear and tear is covered</p>
              <p>• Significant damage will incur repair costs</p>
              <p>• Lost items will be charged at full retail price</p>
              <p>• All items are inspected before and after rental</p>
            </div>
          </div>

          {/* Payment Policy */}
          <div className="border-b pb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiAlertCircle className="text-blue-500" size={20} />
              <h3 className="font-semibold text-lg">Payment Policy</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• 50% down payment required for reservations</p>
              <p>• Full payment must be made before item pickup</p>
              <p>• Security deposit of ₱200 each gown required</p>
              <p>• Accepted payments: Cash, GCash(Fullpayment, downPayment)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: 'What If I Damage The Item?',
    answer: [
      'In the event that the rental is damaged or badly stained, we will assess the damage and inform you of any additional charges including Security deposit needed for repairs.',
    ],
  },

  {
    question: "What happens if I don't pick up my items on the start date?",
    answer: [
      'We provide a grace period of 24 hours after the start date.',
      'If the item is not picked up within the grace period, the reservation will be automatically canceled. You can inquire with the admin about the next steps.',
      'If you wish to request a refund, please contact the admin to find out whether your reservation is eligible for a refund.'
    ],
  },
  {
    question: 'What Is The Rental Period?',
    answer: [
      'Standard rental period is 3 days minimum and can you extend it.',
      'Extend each day can charge 150 pesos',
      'Late returns will incur additional charges 500 pesos as per our Late Return Policy.',
    ],
  },

  {
    question: 'What if I lost QR Code?',
    answer: [
      'We penalty you at range 1000 pesos',
    ],
    
  },
];

export default Faqs;