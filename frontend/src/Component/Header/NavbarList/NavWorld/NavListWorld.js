import {Link} from 'react-router-dom'
import ArticleListWorld from './ArticleListWorld/ArticleListWorld'
import ListWorld from './ListWorld/ListWorld'

const NavListWorld =()=>{
    return (
        <li>
            <Link className="world" to="#">World</Link>
                <div className="megadropdown">
					<div className="container">
						<div className="inner-megadropdown world-dropdown">
                            <ListWorld/>
                            <ArticleListWorld/>
                        </div>
                    </div>
                </div> 
        </li>
    )

}

export default NavListWorld;