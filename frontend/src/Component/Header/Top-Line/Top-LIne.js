import LineList from './Line-List/Line-list'

const TopLine = (props)=>{
    return <div className="top-line">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                         <LineList/>
                    </div>
                </div>
            </div>
        </div>

}

export default TopLine;