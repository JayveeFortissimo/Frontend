import { VscChromeClose, VscBell } from "react-icons/vsc";

const UserNotif = ({ dispatch, Side, allNotif, setHaveNotif }) => {
  // Helper function to parse dates
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    return new Date(dateStr);
  };

  // Sort notifications by date (newest first)
  const sortedNotifications = [...allNotif].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB - dateA;
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative w-full sm:w-[32rem] bg-white rounded-xl shadow-xl">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Notifications
              </h2>
              {sortedNotifications.length > 0 && (
                <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                  {sortedNotifications.length}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setHaveNotif(false);
                dispatch(Side.Notif(false));
              }}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <VscChromeClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Notification Content */}
          <div className="mt-4 h-[calc(25rem-8rem)] overflow-y-auto">
            {sortedNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <VscBell className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-gray-300" />
                <p className="text-base sm:text-lg font-medium">
                  No notifications yet
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  We'll notify you when something arrives
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {sortedNotifications.map((notif, index) => {
                  const isNewest = index === 0;
                  return (
                    <div
                      key={notif.id || index}
                      className={`p-3 sm:p-4 rounded-lg border
                        ${isNewest
                          ? 'border-blue-100 bg-blue-50/50 hover:bg-blue-50'
                          : 'border-gray-100 hover:bg-gray-50'
                        }
                        transition-colors duration-200`}
                    >
                      <div className="flex items-start sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {notif.product_Name}
                          </p>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {notif.message}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 whitespace-nowrap">
                          {notif.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotif;