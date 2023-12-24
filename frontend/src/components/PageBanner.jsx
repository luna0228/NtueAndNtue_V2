import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Select, Space, Tag, Dropdown, Button, message  } from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import bannerNtut from "../assets/PageBannerNtut2.png"
import bannerNtutSm from "../assets/PageBannerNtut2-sm.png"
import bannerNtue from "../assets/PageBannerNtue2.png"
import bannerNtueSm from "../assets/PageBannerNtue2-sm.png"
import { filterWorksListBySkillmultiple } from "../api";
// useEffect(() => {
//     const getSkillmultiple = async (skill1, skill2, skill3) => {
//         const response = await filterWorksListBySkillmultiple(skill1, skill2, skill3);
//         if (Array.isArray(response)) { //確保接到的資料是陣列
//             setWorksList(response);
//         } else {
//             setWorksList([]);
//         }
//         console.log("Updated WorksList:", response); //用於後台判斷
//     }
//     // const getWorksListData = async () => {
//     //     const response = await getWorksList(); // 等待 getWorksList 函數完成，並將返回的數據儲存到 response 變量中
//     //     setWorksList(response); //做一個呼叫與更新
//     //     console.log("Updated WorksList:", response); //用於後台判斷
//     // }
//     getSkillmultiple(skill1, skill2, skill3); //創建好後直接宣告
// }, [skill1, skill2, skill3]);

const options = [
    {
        value: 'JavaScript',
    },
    {
        value: 'HTML',
    },
    {
        value: 'CSS',
    },
    {
        value: 'Bootstrap',
    },
    {
        value: 'RWD',
    }
    ,
    {
        value: 'jQuery',
    }
    ,
    {
        value: 'Git版控',
    }
    ,
    {
        value: 'Firebase',
    }
    ,
    {
        value: 'Lottie',
    }
    ,
    {
        value: 'GASP',
    }
    ,
    {
        value: 'animate.css',
    }
    ,
    {
        value: 'wow.js',
    }
    ,
    {
        value: 'slick.js',
    }
    ,
    {
        value: 'SCSS',
    }
    ,
    {
        value: 'SCSS(Scout-App)',
    }
];

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    
        return (
            <Tag
                className="tag"
                // color="#ACD2BF"
                style={{
                    marginBottom:"1px",
                }}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}

            >
                {label}
            </Tag>
        );
    };

    export default function PageBanner({ school, semester }) {
        //定義學期路徑
        const items = [
            {
                label: <Link to={`/works/${school}/112-1`}>112期中</Link>,
                key: '0',
            },
            {
                label: <Link to={`/works/${school}/111-2`}>111期末</Link>,
                key: '1',
            },
            {
                label: <Link to={`/works/${school}/111-1`}>111期中</Link>,
                key: '2',
            },
            {
                label: <Link to={`/works/${school}/110-2`}>110期末</Link>,
                key: '3',
            },
            {
                label: <Link to={`/works/${school}/110-1`}>110期中</Link>,
                key: '4',
            },

        ];

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
//限定選擇3項
const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectChange = (selected) => {
    const maxAllowed = 3; // 设置最大选择数量为3

    if (selected.length > maxAllowed) {
      message.warning(`最多只能选择 ${maxAllowed} 项`);
      // 如果选择数量超出限制，可以考虑自动取消一些选项或者阻止继续选择
      return;
    }

    
    setSelectedItems(selected);
  };
        return (
            <div className="pageBanner">
                <div className="container">
                    <div className="topBar">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">HOME</a></li>
                            <li className="breadcrumb-item text-uppercase">{school}</li>
                            <li className="breadcrumb-item " >{semester}</li>

                        </ol>

                        {/* <div className="rightBar">

                            <div className="dropdown">
                                <Dropdown

                                    menu={{ items }}
                                    trigger={['click']}

                                >
                                    <Button className="dropdownbutton"
                                        onClick={(e) => e.preventDefault()}>
                                        <Space className="text">
                                            分類
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown></div>
                            <div className="select">
                                <Space
                                    className="space"
                                    style={{
                                        width: "250px",
                                    }}
                                    direction="vertical"
                                >
                                    <Select
                                        className="selectmultiple"
                                        mode="multiple"
                                        listHeight={130}
                                        // value={selectedItems}
                                        // onChange={handleSelectChange}
                                        allowClear
                                        tagRender={tagRender}
                                        // defaultValue={['gold', 'cyan']}
                                        style={{
                                            width: "350px",
                                            
                                        }}

                                        options={options}

                                    />
                                </Space>
                            </div>
                        </div> */}
                    </div>
                    {/* <a className="btn dropdown-toggle text-wrap" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            分類
                        </a>

                        <ul className="dropdown-menu">
                            <li>
                                <Link to={`/works/${school}/112-1`} className="dropdown-item">112期中</Link></li>
                            <li><Link to={`/works/${school}/111-2`} className="dropdown-item">111期末</Link></li>
                            <li><Link to={`/works/${school}/111-1`} className="dropdown-item">111期中</Link></li>
                            <li><Link to={`/works/${school}/110-2`} className="dropdown-item">110期末</Link></li>
                            <li><Link to={`/works/${school}/110-1`} className="dropdown-item">110期中</Link></li>
                        </ul> */}


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