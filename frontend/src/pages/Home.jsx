import React from 'react';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import PastEventsTimeline from '../components/PastEventsTimeline';
function Home() {
    return (
        <div>
            < Navbar />
            < ImageSlider />
            < UpcomingEventsSection />
            < PastEventsTimeline />
        </div>
    )
}

export default Home;