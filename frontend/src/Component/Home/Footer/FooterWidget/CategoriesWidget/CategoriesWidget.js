import {Link} from 'react-router-dom'

const CategoriesWidget = ()=>{
    return <div className="col-md-3">
    <div className="widget categories-widget">
        <h1>Hot Categories</h1>
        <ul className="category-list">
            <li>
                <Link to="#">Business <span>12</span></Link>
            </li>
            <li>
                <Link to="#">Sport <span>26</span></Link>
            </li>
            <li>
                <Link to="#">LifeStyle <span>55</span></Link>
            </li>
            <li>
                <Link to="#">Fashion <span>37</span></Link>
            </li>
            <li>
                <Link to="#">Technology <span>62</span></Link>
            </li>
            <li>
                <Link to="#">Music <span>10</span></Link>
            </li>
            <li>
                <Link to="#">Culture <span>43</span></Link>
            </li>
            <li>
                <Link to="#">Design <span>74</span></Link>
            </li>
            <li>
                <Link to="#">Entertainment <span>11</span></Link>
            </li>
            <li>
                <Link to="#">video <span>41</span></Link>
            </li>
            <li>
                <Link to="#">Travel <span>11</span></Link>
            </li>
            <li>
                <Link to="#">Food <span>29</span></Link>
            </li>
        </ul>
    </div>
</div>
}

export default CategoriesWidget;