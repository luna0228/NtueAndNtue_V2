// import Swiper core and required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

import notFoundImg from "../assets/404.png"
import notFoundImgNtut from "../assets/cardimgNtut.png"
import notFoundImgNtue from "../assets/cardimgNtue.png"

export default function WorkBanner({ worksList, school, semester }) {

    // 圖片Error
    const add404Img = (ev) => {
        if (school == 'ntut') {
            ev.target.src = notFoundImgNtut
        }
        else if (school == 'ntue') {
            ev.target.src = notFoundImgNtue
        }
        else {
            ev.target.src = notFoundImg
        }
    }

    //console.log(worksList)

    return (
        <Swiper
            className="workBanner"
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{ enabled: false }}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    pagination: { clickable: true },
                    navigation: { clickable: true, enabled: true }
                },
            }}

            modules={[Navigation, Pagination]}
        >
            {/* sort依照變數排序(clkcnt) slice只取前5個 */}
            {worksList.sort((a, b) => b.clkcnt - a.clkcnt).slice(0, 5).map((work, index) => (
                <SwiperSlide className="workItemSlide" key={index}>
                    <a href={work.websiteUrl} title={work.workName} target="_blank" className="imgBox">
                        <img src={work.imgUrl} onError={add404Img} alt={work.workName} />
                        <div className="bannerText">
                            <div className="no">0{index + 1}</div>
                            <div className="workTitle"><h4>{work.workName}</h4>
                                <p className="workAuthors">
                                    {work.name.map((workAuthor, index) => {
                                        return (
                                            <span key={index}>{workAuthor}</span>
                                        );
                                    })}
                                    {/* <span>游博翔</span><span>洪呈睿</span> */}
                                </p></div>
                        </div>

                    </a>
                </SwiperSlide>
            ))}

            {/* <SwiperSlide className="workItemSlide">
                <a href="" title="" target="_blank" className="imgBox">
                    <img src={notFoundImgNtue} onError={add404Img} alt="" />
                    <div className="bannerText">
                        <div className="no">01</div>
                        <div className="workTitle"><h4>gamewiki extend</h4><p className="workAuthors"><span>游博翔</span><span>洪呈睿</span></p></div>
                    </div>

                </a>
            </SwiperSlide>
            <SwiperSlide className="workItemSlide">
                <a href="" title="" target="_blank" className="imgBox">
                    <img src="https://images.plurk.com/7qAasgbn6n8lKgeSjCRidO.png" onError={add404Img} alt="" />
                    <div className="bannerText">
                        <div className="no">02</div>
                        <div className="workTitle"><h4>gamewiki extend</h4><p className="workAuthors"><span>游博翔</span><span>洪呈睿</span></p></div>
                    </div>
                </a></SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide> */}
        </Swiper>
    )
}