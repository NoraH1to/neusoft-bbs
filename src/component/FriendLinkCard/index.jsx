import React, { useState, useEffect } from 'react'

import { Grid } from '@material-ui/core'
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
        <Grid container direction="row" justify="center" alignItems="center">
            {linkList.map((link) => (
                <Grid className="pr-2 pb-2" item xs={12}>
                    <FriendLink link={link} />
                </Grid>
            ))}
        </Grid>
    )
}
