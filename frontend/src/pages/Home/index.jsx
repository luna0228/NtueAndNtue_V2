import { Helmet } from "react-helmet-async";
import HomeSchool from "../../components/HomeSchool";

function Home() {
    return (
        <div className="wrapper home">
            {/* 設定頁面title */}
            <Helmet>
                <title>首頁</title>
            </Helmet>
            {/* component */}
            <HomeSchool homeSchool="IXD" homeSchool_className="homeNtut" school="ntut" semester="112-1" />
            <HomeSchool homeSchool="DTD" homeSchool_className="homeNtue" school="ntue" semester="112-1" />

        </div>
    );
}

export default Home;