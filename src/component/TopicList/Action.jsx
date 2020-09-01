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
    const { tabKey, menuKey } = props
    const [requestParams, setRequestParams] = useState({
        [tabKey.key]: tabKey.defaultValue,
        [menuKey.key]: menuKey.defaultValue,
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
                [menuKey.key]: e.target.dataset.value,
            })
        }
    }

    // 当类型改变
    const handleTypeChange = (event, newValue) => {
        setRequestParams({
            ...requestParams,
            [tabKey.key]: newValue,
        })
    }

    // 有数据改变就执行外部传入的回调
    useEffect(() => {
        props.callBackFn ? props.callBackFn(requestParams) : ''
    }, [requestParams[tabKey.key], requestParams[menuKey.key]])

    return (
        <div className={classes.root}>
            <AppBar elevation={0} position="static" color="default">
                <Toolbar variant="dense">
                    {/* 主题帖类型 */}
                    <Tabs
                        value={requestParams[tabKey.key]}
                        onChange={handleTypeChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        className="flex-grow"
                    >
                        {Object.keys(tabKey.selectMap).map((target) => {
                            return tabKey.selectMap[target].useAble ? (
                                <Tab
                                    label={tabKey.selectMap[target].value}
                                    value={tabKey.selectMap[target].key}
                                />
                            ) : (
                                ''
                            )
                        })}
                    </Tabs>
                    {/* 排序 */}
                    <Button
                        className="flex-shrink-0"
                        key="srot-btn"
                        color="inherit"
                        onClick={handleSortBtnClick}
                        startIcon={<SortIcon />}
                    >
                        {menuKey.selectMap[requestParams[menuKey.key]].value}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleSortMenuClose}
                    >
                        {Object.keys(menuKey.selectMap).map((menuIndex) => {
                            return (
                                <MenuItem
                                    onClick={handleSortMenuClose}
                                    data-value={menuKey.selectMap[menuIndex].key}
                                >
                                    {menuKey.selectMap[menuIndex].value}
                                </MenuItem>
                            )
                        })}
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}
