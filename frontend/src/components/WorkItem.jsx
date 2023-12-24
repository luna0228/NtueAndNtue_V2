import { useState, useEffect } from "react";
import { updateClkCnt } from "../api";
import notFoundImg from "../assets/404.png"
import notFoundImgNtut from "../assets/cardimgNtut.png"
import notFoundImgNtue from "../assets/cardimgNtue.png"
import githubIcon from "../assets/githubIcon.svg"
import githubNtue from "../assets/githubNtue.svg"
import githubNtut from "../assets/githubNtut.svg"
import pptIcon from "../assets/pptIcon.svg"
import pptNtue from "../assets/pptNtue.svg"
import pptNtut from "../assets/pptNtut.svg"
import eyeNtue from "../assets/eyeNtue.svg"
import eyeNtut from "../assets/eyeNtut.svg"

export default function WorkItem({ WorksListSemester, worksName, worksSemester }) {

    // 圖片Error
    const add404Img = (ev) => {
        if (worksName == 'ntut') {
            ev.target.src = notFoundImgNtut
        }
        else if (worksName == 'ntue') {
            ev.target.src = notFoundImgNtue
        }
        else {
            ev.target.src = notFoundImg
        }
    }

    // changeGithubImg
    const changeGithubImg = () => {
        let githubImg = ''
        if (worksName == 'ntut') {
            githubImg = githubNtut
        }
        else if (worksName == 'ntue') {
            githubImg = githubNtue
        }
        else {
            githubImg = githubIcon
        }
        return githubImg
    }
    // changePptImg
    const changePptImg = () => {
        let pptImg = ''
        if (worksName == 'ntut') {
            pptImg = pptNtut
        }
        else if (worksName == 'ntue') {
            pptImg = pptNtue
        }
        else {
            pptImg = pptIcon
        }
        return pptImg
    }
    // changeEyeImg
    const changeEyeImg = () => {
        let eyeImg = ''
        if (worksName == 'ntut') {
            eyeImg = eyeNtut
        }
        else if (worksName == 'ntue') {
            eyeImg = eyeNtue
        }
        return eyeImg
    }

    // 卡片右下換字 （學期）
    const ChangeWorksSemester = () => {
        if (worksSemester.slice(4, 5) == '2') {
            worksSemester = worksSemester.slice(0, 3) + '期末'
        }
        else if (worksSemester.slice(4, 5) == '1') {
            worksSemester = worksSemester.slice(0, 3) + '期中'
        }
        else {
            worksSemester = worksSemester
        }
        return worksSemester
    }
    // 卡片右下換字 （學校）
    const ChangeworksName = () => {
        let school = ''
        if (worksName == 'ntut') {
            school = '北科'
        }
        else if (worksName == 'ntue') {
            school = '北教'
        }
        else {
            school = worksName
        }
        return school
    }

    //點擊數＋1
    const [addClkCnt, setClkCnt] = useState(null);
    const AddClkcnt = (id) => {
        //console.log(id)
        const response = updateClkCnt(id);
        setClkCnt(response);
    }

    //console.log("Current addClkCnt:", addClkCnt);


    return (
        <li className="workItem" key={`${WorksListSemester.workName}`}>
            <div className="workItemInner">
                <a href={WorksListSemester.websiteUrl} title={WorksListSemester.workName} target="_blank" onClick={() => AddClkcnt(WorksListSemester.id)}>
                    <div className="imgBox">
                        <img src={WorksListSemester.imgUrl} onError={add404Img} alt={WorksListSemester.workName} />
                    </div>
                </a>
                <div className="textBox">
                    <div className="workTitle">
                        <h4>{WorksListSemester.workName}</h4>
                        <p className="text-gray workAuthors">
                            {WorksListSemester.name.map((workAuthor, index) => {
                                return (
                                    <span key={index}>{workAuthor}</span>
                                );
                            })}
                        </p>
                    </div>
                    <ul className="skillTags">
                        {WorksListSemester.skill.slice(0, 5).map((skillTag, index) => {
                            return (
                                <li key={index}>
                                    <span className="skillTag">{skillTag}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="bottomContent">
                    <div className="remark">
                        {ChangeWorksSemester()}・{ChangeworksName()}
                    </div>
                    <div className="workLink">
                        <a href={WorksListSemester.websiteUrl} title="views" target="_blank"
                            onClick={() => AddClkcnt(WorksListSemester.id)}
                        >
                            <div className="viewsBox">
                                <img src={changeEyeImg()} alt="views"></img>
                                <span className="viewsCount">{WorksListSemester.clkcnt}</span>
                                <span className="viewsText">views</span>
                            </div>
                        </a>
                        <a href={WorksListSemester.pptUrl} title="PPT" target="_blank">
                            <img src={changePptImg()} alt="PPT"></img>
                        </a>
                        <a href={WorksListSemester.githubUrl} title="github" target="_blank">
                            <img src={changeGithubImg()} alt="github"></img>
                        </a>
                    </div>

                </div>
            </div>
        </li>
    )
}
