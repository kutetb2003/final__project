import "./style.scss";
import HrLine from "../HorizontalLine";
const Footer = () => {
    return (  
        <>  
            <HrLine/>
            <div className= "footer">
                <div className= "footer__description">
                    COPYRIGHT © 2024 CELLPHONE SELLING CO., LTD.
                </div>
            </div>
        </>
    );
}
 
export default Footer;