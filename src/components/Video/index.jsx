import React, { useState, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './Video.scss';

export const Video = (props) => {
    const { options, isActiveSwiper, isActiveVideo, paused, muted, cover } = props;

    const [ready, setReady] = useState(false);
    const [touchStart, setTouchStart] = useState(false);
    const [touchMove, setTouchMove] = useState(false);
    const [scrubTime, setScrubTime] = useState(0);
    const [backgroundRemoved, setBackgroundRemoved] = useState(false);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const progress = useRef(null);
    const progressBar = useRef(null);
    const progressPoint = useRef(null);

    const handleTouchStart = () => {
        setTouchStart(true);
    }

    const handleTouchMove = (e) => {
        setTouchMove(true)

        if (touchStart) {
            const player = playerRef.current
            const clientX = e.clientX || e.touches[0].clientX;
            const scrubTime = (clientX / progress.current.offsetWidth) * player.duration();
            const progressPercent = (scrubTime / player.duration()) * 100;
            progressBar.current.style.flexBasis = `${progressPercent}%`;
            progressPoint.current.style.left = `${progressPercent - 1}%`;
            setScrubTime(scrubTime)
        }
    }

    const handleTouchEnd = () => {
        const player = playerRef.current
        if (touchMove) {
            player.currentTime(scrubTime);
        }
        setTouchStart(false)
        setTouchMove(false)
    }

    useEffect(() => {
        if (ready) {
            const player = playerRef.current;
            const interval = setInterval(() => {
                if (!touchStart) {
                    const progressPercent = (player.currentTime() / player.duration()) * 100;
                    progressBar.current.style.flexBasis = `${progressPercent}%`;
                    progressPoint.current.style.left = `${progressPercent - 1}%`;
                }
            }, 300);

            return () => clearInterval(interval);
        }
    }, [ready, touchStart])

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoRef.current.appendChild(videoElement);

            /*
                This is a hack to show the cover image before the video loads. (ios)
            */
            const imageElement = document.createElement("div");
            imageElement.setAttribute('style', `
                width: 100%;
                height: 100%;
                position: absolute;
                background-image: url(${cover});
                z-index: 5;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center center;
            `);
            videoRef.current.appendChild(imageElement);

            playerRef.current = videojs(videoElement, options, () => {
                setReady(true);
            });
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options.sources[0].src, videoRef]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    useEffect(() => {
        const player = playerRef.current;
        if (ready) {
            if (isActiveSwiper) {
                if (isActiveVideo) {
                    if (player.paused()) {
                        player.play();
                        setTimeout(() => {
                            /*
                                This is a hack to remove the cover image after the video loads. (ios)
                            */
                            if (!backgroundRemoved) {
                                videoRef.current.children[1].style.display = 'none';
                                setBackgroundRemoved(true);
                            }
                        }, 500);
                    } else {
                        player.pause();
                    }
                } else {
                    player.pause();
                    player.currentTime(0);
                }
            } else {
                player.pause();
            }
        }
    }, [ready, isActiveSwiper, isActiveVideo, paused])

    useEffect(() => {
        const player = playerRef.current;
        if (ready) {
            if (muted === false && player.muted() === true) {
                player.muted(false);
            }
        }
    }, [ready, muted])

    return (
        <>
            <div ref={videoRef} />
            <div className="video__player-controls">
                <div className="video__progress-container" ref={progress}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="video__progress-filled" ref={progressBar}></div>
                    <div className="video__progress-point" ref={progressPoint}></div>
                </div>
            </div>
        </>
    );
}

export default Video;