// import {Link} from 'react-router-dom'
import {Svg} from './svg-data'
import date from 'date-and-time';

const LineList = ()=>{
    // tanggal
    const now = new Date();
    const pattern = date.compile('ddd, MMM DD YYYY')
    

    return <ul className="top-line-list">
        <li>
			<span className="city-weather">Jakarta, Indonesia</span>
                <Svg/>
			<span className="cel-temperature">+7</span>
		</li>
			<li>
                <span className="time-now">{date.format(now,pattern)}</span>
            </li>
			{/* <li>
                <Link to='#'>Log In</Link>
            </li> */}
			{/* <li>
                <Link to="/contact.html">Contact</Link>
            </li>
			<li>
                <Link to="#">Purchase Theme</Link>
            </li> */}
    </ul>
}


export default LineList;