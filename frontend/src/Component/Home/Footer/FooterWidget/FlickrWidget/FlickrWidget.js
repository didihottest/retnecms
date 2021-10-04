// import images from './images'
import {Link} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import React,{useEffect} from 'react';

// action
import { sentFlickrPhotos } from './redux/actions';

const FlickrWidget = ()=>{
    const dispatch = useDispatch();

    // useEffect to running function action:
    useEffect(()=>{
        dispatch(sentFlickrPhotos())
    },[dispatch])

    // take data from store with useSelector:
    const getFlickrPhotosData = useSelector(state => state.flickrPhotos)

    const {flickrPhotosData, error} = getFlickrPhotosData;

    // console.log('flickr Photos=>', flickrPhotosData);



    return <div className="col-md-3">
                <div className="widget flickr-widget">
                    <h1>Flickr Photos</h1>
					<ul className="flickr-list">
                        {flickrPhotosData && flickrPhotosData.map((data,index)=>{
                            return <li key={data.uuid}>
                                <Link to={`/${data.uuid}`}><img src={data.image1_url} alt="gambar"/></Link>
                            </li>
                        })}
                    </ul>
                    {/* <Link to="#">View more photos...</Link> */}
                </div>
            </div>
}

export default FlickrWidget;