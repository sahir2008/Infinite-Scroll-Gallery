import React, { useState, useEffect } from 'react';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";


function Images() {
    const [images, setImages] = useState({
        count: 30,
        start: 1,
        photos: []
    });

    useEffect(() => {
        axios.get(`/api/photos?count=${images.count}&start=${images.start}`)
            .then(res => setImages({ ...images, photos: res.data }));
    }, []);

    const fetchImages = () => {
        setImages({...images, start: images.start + images.count})
        axios.get(`/api/photos?count=${images.count}&start=${images.start}`)
        .then(res => setImages({ ...images, photos: images.photos.concat(res.data) }))
    }
    return (
        <div className="images">
            <InfiniteScroll 
            dataLength={images.photos.length} 
            next={fetchImages} 
            hasMore={true}
            loader={<h4>Loading...</h4>}
            >
                {images.photos.map(image => (
                    <Image key={image.id} image={image} />
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default Images;
