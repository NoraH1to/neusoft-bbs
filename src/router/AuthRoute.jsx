import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getComputed } from 'concent'
import { every } from 'lodash'

export default props => {
    const hasPermission = getComputed('user')
    const { permissionGroupList, backUrl, ...otherProps } = props
    // 没有需求权限，直接渲染，有需求就判断有没有权限，只要满足权限组的一组就能访问(操作)
    if (
        !permissionGroupList ||
        permissionGroupList.length == 0 ||
        (permissionGroupList &&
            !every(permissionGroupList, permissionGroup =>
                !every(permissionGroup, permission => hasPermission[permission])
            ))
    ) {
        return <Route {...otherProps} />
    } else {
        // 如果没有权限，返回配置的默认路由
        return <Redirect to={backUrl ? backUrl : '/login'} />
    }
}
