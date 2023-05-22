import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import Video from '../Video'
import "swiper/css";
import './VideoSwiper.scss';

const videoJsOptions = {
    autoplay: false,
    controls: false,
    muted: true,
    loop: true,
    playsinline: true,
};

export const VideoSwiper = (props) => {
    const { items, isActiveSwiper, onSetIsMuted, isMuted } = props;

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const handleTransitionEnd = (swiper) => {
        setActiveVideoIndex(swiper.activeIndex)
        setPaused(false);
    }

    const handleSlideChange = () => {
        setPaused(false);
    }

    const handleClickPauseVideo = () => {
        if (isMuted) {
            onSetIsMuted(false);
            return;
        }
        setPaused(!paused);
    }

    useEffect(() => {
        setPaused(false);
    }, [isActiveSwiper])

    return (
        <div className='video-swiper__container' style={{
            display: isActiveSwiper ? 'block' : 'none',
        }}>
            <Swiper
                direction='vertical'
                onTransitionEnd={handleTransitionEnd}
                onSlideChange={handleSlideChange}

            >
                {items.map((item, index) => {
                    const { title, cover, play_url: playURL } = item;
                    return (
                        <SwiperSlide key={index} >
                            <div className='video-swiper__slide-container' onClick={handleClickPauseVideo}>
                                <div className='video-swiper__slide' style={{
                                    opacity: activeVideoIndex === index ? 1 : 0,
                                }} >
                                    <Video
                                        options={{
                                            ...videoJsOptions,
                                            sources: [{
                                                src: playURL,
                                            }],
                                            loadingSpinner: false,
                                        }}
                                        isActiveSwiper={isActiveSwiper}
                                        isActiveVideo={activeVideoIndex === index}
                                        paused={paused}
                                        muted={isMuted}
                                        cover={cover}
                                    />
                                </div>
                                <img src={cover} alt={title} className='video-swiper__overlay' style={{
                                    display: activeVideoIndex === index ? 'none' : 'block',
                                }} />

                                {paused ? <div className='video-swiper__player-icon-container'>
                                    <div className='video-swiper__player-icon' />
                                </div> : null}

                                {isMuted ? <div className='video-swiper__unmute-container'>
                                    Unmute
                                </div> : null}
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default VideoSwiper;