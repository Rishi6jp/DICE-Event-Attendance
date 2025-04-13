
const EventCard = ({ event, onRegisterClick }) => {
    const  { title, description, filled, capacity} = event;

    return(
        <div className='bg-white rounded-xl shadow-md p-4 w-full max-w-xs'>
            <h3 className="text-lg fone-semibold">{title}</h3>
            <p className="text-sm text-gray-600">
                {description.slice(0,60)}...
                <span className="text-blue-500 ml-1 cursor-pointer">Read more</span>
            </p>
            <div className="my-2 w-full bg-gray-200 rounded-full h-3">
                <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${(filled /capacity)*100}%`}}
                />
            </div>
            <div className="text-right text-sm mb-2">{filled}/{capacity}</div>
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={() => onRegisterClick(event._id)}>
                Register Now!
            </button>
        </div>
    )
}

export default EventCard;