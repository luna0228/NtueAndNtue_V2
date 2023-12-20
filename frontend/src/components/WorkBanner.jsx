import { Link } from "react-router-dom";
// import Swiper core and required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

import notFoundImg from "../assets/404.png"
import notFoundImgNtut from "../assets/cardimgNtut.png"
import notFoundImgNtue from "../assets/cardimgNtue.png"

export default function WorkBanner({ school, semester }) {

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
            <SwiperSlide className="workItemSlide">
                <a href="" title="" target="_blank" className="imgBox">
                    <img src={notFoundImgNtue} onError={add404Img} alt="" />
                </a>
                {/* <li className="workItem" key={`${WorksListSemester.workName}`}>
            <div className="workItemInner">
                <a href={WorksListSemester.websiteUrl} title="" target="_blank">
                    <div className="imgBox">
                        <img src={WorksListSemester.imgUrl} onError={add404Img} alt={WorksListSemester.imgUrl} />
                    </div>
                </a>
            </div>
        </li> */}

            </SwiperSlide>
            <SwiperSlide className="workItemSlide">
                <a href="" title="" target="_blank" className="imgBox">
                    <img src={notFoundImgNtut} onError={add404Img} alt="" />
                </a></SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
    )
}