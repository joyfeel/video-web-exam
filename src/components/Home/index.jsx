
import { useState, useEffect } from 'react'
import VideoSwiper from '../VideoSwiper'
import './Home.scss';

const FOLLOWING = 'following'
const FOR_YOU = 'for_you'

const tabs = {
    [FOLLOWING]: 'following_list',
    [FOR_YOU]: 'for_you_list',
}

//const API_ENDPOINT = 'http://192.168.1.223:3000';
const API_ENDPOINT = 'http://localhost:3000';

const Home = () => {
    const [tab, setTab] = useState(FOLLOWING);
    const [followingItems, setFollowingItems] = useState([]);
    const [foryouItems, setForyouItems] = useState([]);
    const [isMuted, setIsMuted] = useState(true);

    const handleSelectTab = (tab) => {
        setTab(tab);
    }

    useEffect(() => {
        fetch(`${API_ENDPOINT}/${tabs[FOLLOWING]}`).then((res) => res.json()).then((data) => {
            const items = data.items;
            setFollowingItems(items)
        });

        fetch(`${API_ENDPOINT}/${tabs[FOR_YOU]}`).then((res) => res.json()).then((data) => {
            const items = data.items;
            setForyouItems(items)
        });
    }, []);

    return (
        <div className='home__container'>
            <div className='home__header-container'>
                <nav className='home__nav-tab'>
                    <div
                        className={`home__nav-item ${tab === FOLLOWING ? 'home__nav-item--active' : ''}`}
                        onClick={() => handleSelectTab(FOLLOWING)}
                    >
                        Following
                    </div>
                    <div
                        className={`home__nav-item ${tab === FOR_YOU ? 'home__nav-item--active' : ''}`}
                        onClick={() => handleSelectTab(FOR_YOU)}
                    >
                        For You
                    </div>
                </nav>
            </div>
            <VideoSwiper
                items={followingItems}
                isActiveSwiper={tab === FOLLOWING}
                onSetIsMuted={setIsMuted}
                isMuted={isMuted}
            />
            <VideoSwiper
                items={foryouItems}
                isActiveSwiper={tab === FOR_YOU}
                onSetIsMuted={setIsMuted}
                isMuted={isMuted}
            />
        </div>
    );
}

export default Home;
