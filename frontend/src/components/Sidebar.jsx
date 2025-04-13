import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  DocumentIcon,
  UsersIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/admin/events' },
  { name: 'Attendance', icon: CalendarIcon, path: '/admin/attendance' },
  { name: 'Blacklist', icon: UsersIcon, path: '/admin/blacklist' },
  { name: 'Unblacklist Requests', icon: Cog6ToothIcon, path: '/admin/unblacklist-requests' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-indigo-700 text-white flex flex-col">
      <div className="px-4 py-5">
        <div className="text-2xl font-bold">🎓 DICE Admin</div>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-indigo-500 ${
              location.pathname.includes(item.path) ? 'bg-indigo-500' : ''
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
