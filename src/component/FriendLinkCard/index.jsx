import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import FriendLink from './FriendLink'

import { linkList as requestLinkList } from '@api/link'

export default () => {
    const [linkList, setLinkList] = useState([])

    // 获得友情链接
    const getLinkList = () => {
        requestLinkList
            .request()
            .then((res) => {
                setLinkList(res.data)
            })
            .catch((err) => {
                console.log('requestLinkList fail', err)
            })
    }

    // 初始化请求一次
    useEffect(() => {
        getLinkList()
    }, [])

    return (
        // <div className="flex flex-wrap">
        <>
            <Grid container direction="row" justify="center" alignItems="center">
                {linkList.map((link) => {
                    return <FriendLink link={link} />
                })}
            </Grid>
        </>
        // </div>
    )
}
