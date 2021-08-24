import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "@tarojs/components";
import VirtualList from "@tarojs/components/virtual-list";
// import { throttle } from "lodash";

// import VirtualListRow from "@/common/virtual-list-row";
import EmptyStatus from "@/common/empty-status";

import "./virtual-list.scss";

const VirtualCommonList = props => {
  const {
    renderList, // 每次加载回来的列表数据（页数据集合）
    // pageList, // 请求回来的一页列表数据（单页数据）
    virtualListHeight, // 列表的高度
    itemSize = 40, // 列表单项的高度
    loading,
    emptyText,
    hasMore,
    listReachBottom = () => {}
  } = props;
  let renderListLength = 0;
  let newRenderList = [];

  // 在列表最后添加 “已加载完毕”
  if (renderList) {
    newRenderList = [...renderList];
    newRenderList.push(`${hasMore ? "加载更多" : "--没有更多了--"}`);
    renderListLength = newRenderList.length;

    console.log(555);
  }

  const VirtualListRow = React.memo(memoProps => {
    const { id, index, style, data } = memoProps;

    return (
      <View
        id={id}
        className={index % 2 ? "ListItemOdd" : "ListItemEven"}
        style={style}
      >
        Row {index} : {data[index]}
      </View>
    );
  });

  console.log(newRenderList, 'list');

  return (
    <View className="virtual-common-list">
      {renderList?.length ? (
        <VirtualList
          height={virtualListHeight} // 列表的高度
          width="100%" // 列表的宽度
          itemData={newRenderList || []} // 渲染列表的数据
          itemCount={renderListLength} // 渲染列表的长度
          itemSize={itemSize} // 列表单项的高度
          onScroll={({ scrollDirection, scrollOffset }) => {
            // const throttleFn = throttle(listReachBottom, 2000, {
            //   trailing: false
            // });
            if (
              // 避免重复加载数据
              !loading &&
              // 只有往前滚动我们才触发
              scrollDirection === "forward" &&
              // virtualListHeight / itemSize = (列表高度 / 单项列表高度)
              // 80 = 滚动提前加载量，可根据样式情况调整
              scrollOffset >
                renderListLength * itemSize - virtualListHeight - 10
            ) {
              // throttleFn();
              // listReachBottom();
              console.log(1234);
            }

            console.log(scrollDirection, scrollOffset, "onScroll");
          }}
        >
          {
            VirtualListRow // 列表单项组件，这里只能传入一个组件
          }
        </VirtualList>
      ) : (
        // 空状态
        <EmptyStatus style={{ height: virtualListHeight }} text={emptyText} />
      )}
    </View>
  );
};

export default VirtualCommonList;
