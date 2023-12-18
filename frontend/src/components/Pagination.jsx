
import { Pagination } from 'antd';
export default function CustomPagination({ current, onChange, total, pageSize }) {  // 将你的组件重命名为 CustomPagination
  return (
    <div className="PaginationBox">
      <Pagination
        defaultCurrent={current}  // 默認的當前頁數
        onChange={onChange} //頁數變化時的回調函數
        total={total}            // 總數據庫
        pageSize={pageSize} // 每頁的項目數
        className="customPagination"  // 应用自定义的 CSS 类
      />
    </div>
  );
}
