
import React, { useState, useEffect } from 'react';

// Import festival images
import newYearImg from '../festivalImages/newYearImg.jpg';
import makarSankrantiImg from '../festivalImages/makarSankrantiImg.jpg';
import valentinesDayImg from '../festivalImages/valentinesDayImg.jpg';
import holiImg from '../festivalImages/holiImg.jpg';
import hanumanImg from '../festivalImages/hanumanImg.jpg';
import labourDayImg from '../festivalImages/labourDayImg.avif';
import independenceDayImg from '../festivalImages/independenceDayImg.webp';
import janmashtamiImg from '../festivalImages/janmashtamiImg.jpg';
import republicDayImg from '../festivalImages/republicDayImg.webp';
import rakshaBandhanImg from '../festivalImages/rakshaBandhanImg.jpg';
import ganeshChaturthiImg from '../festivalImages/ganeshChaturthiImg.jpg';
import navaratriImg from '../festivalImages/navaratriImg.jpg';
import dussehraImg from '../festivalImages/dussehraImg.webp';
import diwaliImg from '../festivalImages/diwaliImg.jpg';
import christmasImg from '../festivalImages/christmasImg.jpg';
import eidFitrImg from '../festivalImages/eidFitrImg.jpg';
import eidAdhaImg from '../festivalImages/eidAdhaImg.jpg';
import muharramImg from '../festivalImages/muharramImg.jpg';
import miladUnNabiImg from '../festivalImages/miladUnNabiImg.avif';
import goodFridayImg from '../festivalImages/goodFridayImg.jpg';
import easterImg from '../festivalImages/easterImg.jpg';

import image from '../assets/logo.jpg';

import life1Img from '../festivalImages/life1Img.jpg';
import life2Img from '../festivalImages/life2Img.jpg';
import life3Img from '../festivalImages/life3Img.jpg';
import life4Img from '../festivalImages/life4Img.jpg';

const festivalData = [
    { date: '01-01', name: 'New Year', quote: '🎉 Welcome the new year with joy and hope!', image: newYearImg },
    { date: '01-14', name: 'Makar Sankranti', quote: '🪁 Celebrate the harvest and enjoy the flight of kites!', image: makarSankrantiImg },
    { date: '02-14', name: "Valentine's Day", quote: '❤️ Spread love and joy to everyone around you!', image: valentinesDayImg },
    { date: '03-29', name: 'Holi', quote: '🌈 Colors of joy and happiness. Let’s celebrate!', image: holiImg },
    { date: '04-23', name: 'Hanuman Jayanti', quote: '🙏 Strength, Devotion, and Wisdom - Happy Hanuman Jayanti!', image: hanumanImg },
    { date: '05-01', name: 'Labour Day', quote: '👷‍♂️ Honoring the hard work and efforts of workers worldwide.', image: labourDayImg },
    { date: '08-15', name: 'Independence Day (India)', quote: '🇮🇳 Freedom is our birthright! Celebrate independence!', image: independenceDayImg },
    { date: '09-02', name: 'Janmashtami', quote: '🌸 Celebrate the birth of Lord Krishna with devotion and love!', image: janmashtamiImg },
    { date: '10-02', name: 'Gandhi Jayanti', quote: '🕊️ “Be the change you want to see in the world.” – Gandhi', image: republicDayImg },
    { date: '10-12', name: 'Dussehra', quote: '🔥 Victory of good over evil! Happy Dussehra!', image: dussehraImg },
    { date: '10-31', name: 'Diwali', quote: '🪔 Light over darkness. Prosperity over despair. Happy Diwali!', image: diwaliImg },
    { date: '12-25', name: 'Christmas', quote: '🎄 Joy, Peace, and Love. Merry Christmas!', image: christmasImg },
    { date: '04-10', name: 'Eid al-Fitr', quote: '🕌 Celebrate the end of Ramadan with feasts and prayers.', image: eidFitrImg },
    { date: '06-16', name: 'Eid al-Adha (Bakra Eid)', quote: '🐑 Honoring the sacrifice of Ibrahim.', image: eidAdhaImg },
    { date: '07-17', name: 'Muharram / Ashura', quote: '🕌 Islamic New Year. Reflect on the journey of faith.', image: muharramImg },
    { date: '09-16', name: 'Milad-un-Nabi', quote: '🌙 Celebrating the birth of Prophet Muhammad.', image: miladUnNabiImg },
    { date: '03-29', name: 'Good Friday', quote: '✝️ Commemorates the crucifixion of Jesus Christ.', image: goodFridayImg },
    { date: '03-31', name: 'Easter Sunday', quote: '✝️ Celebrate the resurrection of Jesus Christ!', image: easterImg },
    // { date: '04-24', name: 'Shahzad Alam', quote: '🔥 Dream big, work hard, make it happen!', image: image },
];

const lifeQuotes = [
    { quote: '🌱 Every day is a new beginning.', image: life1Img },
    { quote: '💪 Embrace challenges, grow stronger.', image: life2Img },
    { quote: '🌟 Stay positive, work hard, make it happen.', image: life3Img },
    { quote: '🔥 Ignite your passion, fuel your dreams.', image: life4Img },

    { quote: '🌱 Growth begins when you step out of your comfort zone.', image: life1Img },
    { quote: '💪 Strength does not come from what you can do, but from overcoming the things you once thought you couldn’t.', image: life2Img },
    { quote: '🌟 Your future is created by what you do today, not tomorrow.', image: life3Img },
    { quote: '🔥 Your passion is the key to unlocking your dreams.', image: life4Img },
    { quote: '💫 Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.', image: life1Img },
    { quote: '🌻 You are stronger than you think. Keep going, you’re closer than you believe.', image: life2Img },
    { quote: '🌍 The best way to predict the future is to create it.', image: life3Img },
    { quote: '🌈 Let your dreams be bigger than your fears, and your actions louder than your words.', image: life4Img },
    { quote: '⚡ Success is not the key to happiness. Happiness is the key to success.', image: life1Img },
    { quote: '🔥 Rise above the storm and you will find the sunshine.', image: life2Img },

];

const Banner = () => {
    const [currentFestival, setCurrentFestival] = useState(null);
    const [randomLifeQuote, setRandomLifeQuote] = useState(lifeQuotes[0]);





    useEffect(() => {
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        console.log("Today's formatted date:", formattedDate);

        const festival = festivalData.find(f => f.date === formattedDate);
        if (festival) {
            console.log("Found festival:", festival.name);
            setCurrentFestival(festival);
        } else {
            console.log("No festival today, picking random life quote.");
            const random = lifeQuotes[Math.floor(Math.random() * lifeQuotes.length)];
            setRandomLifeQuote(random);
        }
    }, []);

    return (
        <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
                src={currentFestival ? currentFestival.image : randomLifeQuote.image}
                alt={currentFestival ? currentFestival.name : 'Life Quote'}
                className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center  bg-opacity-50 p-4 gap-2">
                {currentFestival ? (
                    <>
                        <h2 className="text-3xl font-bold  bg-white/20 backdrop-blur-lg text-white p-4 rounded-2xl shadow-lg border border-white/30">{currentFestival.name}</h2>
                        <p className="text-2xl bg-white/20 backdrop-blur-lg text-black p-4 rounded-2xl shadow-lg border border-white/30">"{currentFestival.quote}"</p>
                    </>
                ) : (


                    <p className="text-2xl bg-white/20 backdrop-blur-lg text-black p-4 rounded-2xl shadow-lg border border-white/30">
                        "{randomLifeQuote.quote}"
                    </p>


                )}
            </div>
        </div>
    );
};

export default Banner;
