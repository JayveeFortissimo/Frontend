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
              <p>• Cancellation requests must be submitted at least 48 hours before rental date</p>
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
              <p>• Multiple late returns may affect future rental privileges</p>
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
              <p>• Security deposit of ₱200 required</p>
              <p>• Accepted payments: Cash, GCash</p>
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
      'Cristobal Collection covers minor wear and tear. Each rental piece is inspected thoroughly to ensure that it arrives in good condition and is checked again upon return.',
      'In the event that the rental is damaged or badly stained, we will assess the damage and inform you of any additional charges needed for repairs.',
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
    question: 'How Do I Know My Size?',
    answer: [
      'We provide detailed size measurements for each item in our collection.',
      'You can find specific measurements in the product description.',
      'If you re unsure, feel free to contact us for sizing assistance.',
    ],
  },
  {
    question: 'What Is The Rental Period?',
    answer: [
      'Standard rental period is 3-5 days.',
      'Extended rental periods are available upon request.',
      'Late returns will incur additional charges as per our Late Return Policy.',
    ],
  },
  {
    question: 'How Do I Make A Reservation?',
    answer: [
      'Select your desired item and rental dates.',
      'Complete the checkout process with your payment information.',
      'You ll receive a confirmation email with rental details.',
      'We recommend booking at least a week in advance for special events.',
    ],
  },
];

export default Faqs;