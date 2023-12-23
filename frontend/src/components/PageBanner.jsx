import { Link } from "react-router-dom";
import { Select, Space, Tag, Dropdown, Spin, Button } from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import bannerNtut from "../assets/PageBannerNtut2.png"
import bannerNtutSm from "../assets/PageBannerNtut2-sm.png"
import bannerNtue from "../assets/PageBannerNtue2.png"
import bannerNtueSm from "../assets/PageBannerNtue2-sm.png"



const options = [
    {
        value: 'gold',
    },
    {
        value: 'lime',
    },
    {
        value: 'green',
    },
    {
        value: 'cyan',
    },
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

    return (
        <div className="pageBanner">
            <div className="container">
                <div className="topBar">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">HOME</a></li>
                        <li className="breadcrumb-item text-uppercase">{school}</li>
                        <li className="breadcrumb-item " >{semester}</li>

                    </ol>

                    <div className="rightBar">

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
                                    allowClear
                                    tagRender={tagRender}
                                    // defaultValue={['gold', 'cyan']}
                                    style={{
                                        width: "230px",
                                    }}

                                    options={options}

                                />
                            </Space>
                        </div>
                    </div>
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





                <Spin
                    className="spin"
                    size="large"
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 24,
                            }}
                            spin
                        />
                    }
                />
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