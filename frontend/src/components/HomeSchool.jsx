import { Link } from "react-router-dom";

export default function HomeSchool({ homeSchool, homeSchool_className, school, semester }) {
    return (
        <div className={`homeSchool ${homeSchool_className}`}>
            <div className="homeBox text-center">
                <div className="homeTitle">
                    <h1>{homeSchool}</h1>
                </div>
                <div className="solgan">
                    CLASS<br />
                    OF<br />
                    WEBSITE DESIGN<br />
                    AND DEVELOPMENT<br />
                </div>
                {/* Router 傳入“link”值 */}
                <Link to={`works/${school}/${semester}`} className="btn-basic">VIEW</Link>
            </div>
            <div className="homeElf">
                <span className="eye"></span>
                <span className="eye"></span>
            </div>
        </div>
    );
}