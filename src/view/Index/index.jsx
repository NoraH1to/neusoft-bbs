import React, { useEffect, useState } from 'react'

// 组件
import Category from '@component/Category'
import FriendLinkCard from '@component/FriendLinkCard'

// 接口
import { homeBoardList } from '@api/forum'

export default () => {
    const [mainState, setMainState] = useState({
        state: [],
    })
    function requestMainList() {
        homeBoardList
            .request()
            .then((res) => {
                setMainState({
                    state: res.data,
                })
            })
            .catch((err) => {
                console.log('request main list fail', err)
            })
    }
    useEffect(() => {
        // 请求
        requestMainList()
    }, [])
    return (
        <>
            {mainState.state.map((category) => (
                <div className="p-4">
                    <Category category={category} />
                </div>
            ))}
            <FriendLinkCard />
        </>
    )
}
