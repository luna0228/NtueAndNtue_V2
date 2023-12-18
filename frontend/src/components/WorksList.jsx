import { useState, useEffect } from "react";
import WorkItem from "./WorkItem";
import Pagination from "./Pagination";
import WorksListJson from "../json/WorksList.json"
import { getWorksList } from "../api";

export default function WorksList({ school, semester }) {
    //非同步接資料
    const [WorksList, setWorksList] = useState(WorksListJson);
    //耕締以下新增
    const [currentPage, setCurrentPage]=useState(1); //新增當前頁碼為1，以及移動頁碼規則
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); //新增頁面寬度為螢幕目前寬度（window.innerWidth），以及螢幕變化規則
    const itemsPerPage = windowWidth <= 576 ? WorksList[school][semester].length : 12; // 在576px以上顯示至多十二個，576px以下全列表顯示。使用?:做IF運算。
    const semesterData = WorksList[school]?.[semester] ?? []; //應用可選鏈與空值合併運算子，確保資料缺失時依然有個空陣列可用
    const totalWorks = semesterData.length; //宣告要處理的總卡片數值等同於學期卡片數的數量
    const totalPages = Math.ceil(totalWorks / itemsPerPage); //運算所需要的頁數
    // 定義頁數的切片
    const currentWorks = semesterData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 使用 useEffect 鉤子來監聽瀏覽器窗口的大小變化，因為要判斷576px視窗時把更動每頁顯示的卡片數。如果寬度變化時自動更新windowWith的數字
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth); // 讓handleResize來記錄視窗變化
        window.addEventListener("resize", handleResize); //當視窗大小更動時，執行handleResize。.addEventListener是一種監聽指令
        return () => window.removeEventListener("resize", handleResize); //清理監聽器用
      }, []); //頁面第一次執行時，會做一次偵測。


    // 使用 useEffect 来獲取列表數據，採用非同步的處理。
    useEffect(() => {  
        const getWorksListData = async () => {
            const response = await getWorksList(); // 等待 getWorksList 函數完成，並將返回的數據儲存到 response 變量中
            setWorksList(response); //做一個呼叫與更新
            console.log("Updated WorksList:", response); //用於後台判斷
        }
        getWorksListData(); //創建好後直接宣告
    }, []); 

    // console.log("Current WorksList:", WorksList);
    // console.log(school + "," + semester);
    // console.log("Current Works:", currentWorks);
    // console.log("Total Works:", totalWorks);
    // console.log("Total Pages:", totalPages);

    return (
        <div className="worksListBox">
            <div className="container">
                <ul className="worksList">
                    {/* 使用 map 函数来渲染 currentWorks 中的每个作品 */}
                    {currentWorks.map((work, index) => (
                        <WorkItem
                            key={index}
                            WorksListSemester={work}
                            worksName={school}
                            worksSemester={semester} />
                    ))}
                </ul>
                {/* 使用 Pagination 组件来渲染页码。同時確保給予正確的屬性。並且處裡只有數據情況下顯示分頁組件 */}
                {totalPages > 1 && ( //&&是且的意思，左邊為真實，後續的渲染才會執行
                    <Pagination 
                        current={currentPage} 
                        onChange={(page) => setCurrentPage(page)} 
                        total={totalWorks} 
                        pageSize={itemsPerPage}
                    />
                )}
            </div>
        </div>

    )
}