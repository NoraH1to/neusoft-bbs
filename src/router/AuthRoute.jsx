import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getComputed } from 'concent'
import { every } from 'lodash'

export default (props) => {
    const hasPermission = getComputed('user')
    const { permissionGroupList, backUrl, component, redirect, ...otherProps } = props

    // 转发
    if (redirect) {
        console.log('redirect', redirect)
        return (
            <Redirect
                to={props.path
                    .concat(redirect)
                    .replace(
                        ':'.concat(Object.keys(props.params)[0]),
                        Object.values(props.params)[0]
                    )}
            />
        )
    }
    // 没有需求权限，直接渲染，有需求就判断有没有权限，只要满足权限组的一组就能访问(操作)
    else if (
        !permissionGroupList ||
        permissionGroupList.length == 0 ||
        (permissionGroupList &&
            !every(
                permissionGroupList,
                (permissionGroup) =>
                    !every(permissionGroup, (permission) => hasPermission[permission])
            ))
    ) {
        return <Route {...otherProps} />
    } else {
        // 如果没有权限，返回配置的默认路由
        return <Redirect to={backUrl ? backUrl : '/'} />
    }
}
