import { Link } from "react-router-dom";
import bannerNtut from "../assets/PageBannerNtut2.png"
import bannerNtutSm from "../assets/PageBannerNtut2-sm.png"
import bannerNtue from "../assets/PageBannerNtue2.png"
import bannerNtueSm from "../assets/PageBannerNtue2-sm.png"
export default function PageBanner({ school, semester }) {


    // 圖片banner

    const pageBannerPC = (ev) => {
        let BannerPC
        if (school == 'ntut') {
            BannerPC = bannerNtut
        }
        else if (school == 'ntue') {
            BannerPC = bannerNtue
        }
        else {
            BannerPC = ''
        }
        return BannerPC
    }
    // 圖片banner
    const pageBannerMB = (ev) => {
        let BannerMB
        if (school == 'ntut') {
            BannerMB = bannerNtutSm
        }
        else if (school == 'ntue') {
            BannerMB = bannerNtueSm
        }
        else {
            BannerMB = ''
        }
        return BannerMB
    }

    return (
        <div className="pageBanner">
            <div className="container">
                <div className="topBar">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">HOME</a></li>
                        <li className="breadcrumb-item text-uppercase">{school}</li>
                        <li className="breadcrumb-item " >{semester}</li>

                    </ol>

                    <div className="dropdown">
                        <a className="btn dropdown-toggle text-wrap" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            分類
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to={`/works/${school}/112-1`} className="dropdown-item">112期中</Link></li>
                            <li><Link to={`/works/${school}/111-2`} className="dropdown-item">111期末</Link></li>
                            <li><Link to={`/works/${school}/111-1`} className="dropdown-item">111期中</Link></li>
                            <li><Link to={`/works/${school}/110-2`} className="dropdown-item">110期末</Link></li>
                            <li><Link to={`/works/${school}/110-1`} className="dropdown-item">110期中</Link></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="container page-container">
                <div className="bannerImg">
                    <img src={pageBannerMB()} alt={`banner-${school}`} className="hide-md" />
                    <img src={pageBannerPC()} alt={`banner-${school}`} className="show-md" />
                </div>
            </div>

        </div>
    )
}