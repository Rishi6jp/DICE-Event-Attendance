const EventCard = ({ event, onRegisterClick }) => {
    const { title, description, filled, capacity } = event;
  
    return (
      <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-sm aspect-[4/3] flex flex-col justify-between overflow-hidden">
        {/* Top: Title & Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-4">
            {description}
          </p>
        </div>
  
        {/* Middle: Progress Bar */}
        <div className="my-3">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${(filled / capacity) * 100}%` }}
            />
          </div>
          <div className="text-right text-sm mt-1">{filled}/{capacity}</div>
        </div>
  
        {/* Bottom: Register Button */}
        <button
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          onClick={() => onRegisterClick(event._id)}
        >
          Register Now!
        </button>
      </div>
    );
  };
  
  export default EventCard;
  