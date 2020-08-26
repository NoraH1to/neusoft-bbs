import React, { useState, useEffect } from 'react'

import { attrMap } from '@modules/topic/template'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SortIcon from '@material-ui/icons/Sort' 

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}))

export default (props) => {
    const classes = useStyles()
    const [requestParams, setRequestParams] = useState({
        [attrMap.type.key]: attrMap.type.selectMap.normal.key,
        [attrMap.sort.key]: attrMap.sort.selectMap.replyTime.key,
    })

    const [anchorEl, setAnchorEl] = React.useState(null)

    // 点击按钮显示菜单
    const handleSortBtnClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    // 关闭菜单
    const handleSortMenuClose = (e) => {
        setAnchorEl(null)
        // 有值就同步
        if (e.target.dataset.value) {
            setRequestParams({
                ...requestParams,
                [attrMap.sort.key]: e.target.dataset.value,
            })
        }
    }

    // 当主题帖类型改变
    const handleTypeChange = (event, newValue) => {
        setRequestParams({
            ...requestParams,
            [attrMap.type.key]: newValue,
        })
    }

    // 有数据改变就执行外部传入的回调
    useEffect(() => {
        props.callBackFn ? props.callBackFn(requestParams) : ''
    }, [requestParams[attrMap.type.key], requestParams[attrMap.sort.key]])

    return (
        <div className={classes.root}>
            <AppBar elevation={0} position="static" color="default">
                <Toolbar variant="dense">
                    {/* 主题帖类型 */}
                    <Tabs
                        value={requestParams[attrMap.type.key]}
                        onChange={handleTypeChange}
                        indicatorColor="transparent"
                        textColor="primary"
                        variant="scrollable"
                        className="flex-grow"
                    >
                        <Tab
                            label={attrMap.type.selectMap.normal.value}
                            value={attrMap.type.selectMap.normal.key}
                        />
                        <Tab
                            label={attrMap.type.selectMap.featured.value}
                            value={attrMap.type.selectMap.featured.key}
                        />
                    </Tabs>
                    {/* 排序 */}
                    <Button color="inherit" onClick={handleSortBtnClick} startIcon={<SortIcon />}>
                        {attrMap.sort.selectMap[requestParams[attrMap.sort.key]].value}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleSortMenuClose}
                    >
                        {Object.keys(attrMap.sort.selectMap).map((menuIndex) => {
                            return (
                                <MenuItem
                                    onClick={handleSortMenuClose}
                                    data-value={attrMap.sort.selectMap[menuIndex].key}
                                >
                                    {attrMap.sort.selectMap[menuIndex].value}
                                </MenuItem>
                            )
                        })}
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}
