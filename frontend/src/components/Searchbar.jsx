import {useState} from 'react';

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    return(
        <div className='flex max-w-xl mx-auto my-6 border border-gray-300 rounded-lg overflow-hidden '>
            <input
                type='text'
                className='w-full px-4 py-2 outline-non'
                placeholder='Search'
                value = {query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch(e.target.value);
                }}
            />
            <button className="bg-blue-500 text-white px-4">
                <i className='fas fa-search'></i>
            </button>
        </div>
    )
}

export default SearchBar;