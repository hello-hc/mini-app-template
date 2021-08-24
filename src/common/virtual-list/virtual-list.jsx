import React from "react";
import { View } from "@tarojs/components";
import VirtualList from "@tarojs/components/virtual-list";

import EmptyStatus from "@/common/empty-status";

import "./virtual-list.scss";

const VirtualCommonList = props => {
  const {
    renderList, // 每次加载回来的列表数据（页数据集合）
    // pageList, // 请求回来的一页列表数据（单页数据）
    virtualListHeight, // 列表的高度
    itemSize = 40, // 列表单项的高度
    loading, // loading状态
    emptyText, // 空状态文本
    hasMore, // 是否显示加载更多
    listReachBottom = () => {} // 上拉加载处理函数
  } = props;
  // 是否加载
  let isLoad = true;
  // 延时器
  let timer = null;

  const VirtualListRow = React.memo(rowProps => {
    const { id, index, style, data } = rowProps;

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

  const renderBottom = () => {
    return (
      <View>
        {`${hasMore ? "加载更多" : "--没有更多了--"}`}
      </View>
    );
  }

  return (
    <View className="virtual-common-list">
      {renderList?.length ? (
        <VirtualList
          height={virtualListHeight} // 列表的高度
          width="100%" // 列表的宽度
          itemData={renderList || []} // 渲染列表的数据
          itemCount={renderList.length} // 渲染列表的长度
          itemSize={itemSize} // 列表单项的高度
          // unlimitedSize={true} // 解开列表节点大小限制
          renderBottom={renderBottom()} // 列表的底部区域信息展示
          onScroll={({ scrollDirection, scrollOffset }) => {
            /** PS:
             * 这里我设置的 30 的距离底部加载数据的滚动量，触发的时候可能会执行很多次，因此
             * 我添加了 isLoad 来控制只执行一次。
             * 等到函数执行后再重置回去
             */
            if (
              // 避免重复加载数据
              !loading &&
              // 只有往前滚动我们才触发
              scrollDirection === "forward" &&
              scrollOffset >
                renderList.length * itemSize - virtualListHeight - 30
              && isLoad
            ) {
              isLoad = false;
              listReachBottom();

              // 一秒后重置
              timer = setTimeout(() => {
                isLoad = true;
                timer = null;
                clearTimeout(timer);
              }, 1000);
            }
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
