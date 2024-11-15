import { useEffect, useState } from 'react';
import { FiStar, FiUser, FiMessageSquare, FiAward } from 'react-icons/fi';

const ReviewPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = 'AIzaSyB5BextMQzNGwov_Y0kw4_rRce6q00VmYs';
  const spreadsheetId = '1ptYJKuolixnwHCBjNkG2j7FOUiJltOqBSS6OeAlUVek';
  const range = 'JAYVEE!A1:F10';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from Google Sheets.');
        }

        const result = await response.json();
        setData(result.values || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Could not fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  // Remove the header row and map data to create testimonials
  const testimonials = data.slice(1).map((row) => {
    const imageUrl = row[5] ? `http://localhost:8000//proxy-image/${row[5].split('id=')[1]}` : null;
    return {
      quote: row[3],
      name: row[1],
      title: row[2],
      imageUrl,
    };
  }).filter(testimonial => testimonial.quote && testimonial.name && testimonial.title); // Filter out rows missing essential data

  const stats = [
    { label: 'Total Reviews', value: testimonials.length, icon: FiMessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Error Handling */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Experience Reviews</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Authentic feedback from our valued customers at Cristobal Collections
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="text-blue-500 w-6 h-6" />
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="text-gray-600 font-medium">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={review.imageUrl || 'https://via.placeholder.com/150'} // Use placeholder if no image URL
                    alt={review.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150'; // Use placeholder on error
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.title}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">&ldquo;{review.quote}&rdquo;</p>
              </div>
              <div className="text-sm text-gray-500">Verified Customer</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-3xl mx-auto text-center mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Thank You for Your Trust</h2>
        <p className="text-gray-600 mb-6">
          We appreciate every customer who takes the time to share their experience at Cristobal Collections.
          Your feedback helps us maintain our commitment to excellence.
        </p>
        <div className="flex justify-center gap-2 text-3xl">
          <span role="img" aria-label="smile">😊</span>
          <span role="img" aria-label="heart">❤️</span>
          <span role="img" aria-label="thank you">🙏</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
