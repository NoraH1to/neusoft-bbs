import React from 'react'

import Link from '@material-ui/core/Link'

import { attrMap } from '@modules/link/template'

export default (props) => {
    const { link } = props
    return (
        <div className="flex items-center">
            <img src={link[attrMap.iconUrl.key]} className="mr-2" />
            <Link
                noWrap
                rel="noopener"
                href={link[attrMap.url.key]}
                target="_blank"
            >
                {link[attrMap.name.key]}
            </Link>
        </div>
    )
}
