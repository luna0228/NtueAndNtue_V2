
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import WorksList from "../../components/WorksList";
import Header from "../../components/Header";
import PageBanner from "../../components/PageBanner";
import PageTitle from "../../components/PageTitle";

function Works() {
    //  useParam 接router傳入的值（ntut/ntue）
    const { school, semester } = useParams();

    return (
        <div className={`wrapper page page-${school}`}>
            {/* 帶入worksName 設定個別className css樣式調整可用此className調整 */}
            {/* 設定頁面title */}
            <Helmet>
                <title>{school} 作品頁</title>
            </Helmet>
            <Header school={school} semester={semester}></Header>
            <PageBanner school={school} semester={semester}></PageBanner>
            <main>
                {/* 傳入school：ntut/ntue ; semester：學期*/}
                <PageTitle semester={semester}></PageTitle>
                <WorksList school={school} semester={semester}></WorksList>
            </main>

        </div>
    );
}

export default Works;

