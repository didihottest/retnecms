import CopyRight from "./Copyright"
import FooterWidget from "./FooterWidget/FooterWidget"

const Footer = ()=>{
    return<footer>
            <div className="container"> 
                <FooterWidget/>
                <CopyRight/>
            </div> 
        </footer>
}

export default Footer;