import React from 'react'

import Link from '@material-ui/core/Link'

import { attrMap } from '@modules/link/template'

export default (props) => {
    const { link } = props
    return (
        <div>
            <img src={link[attrMap.iconUrl.key]} />
            <Link rel="noopener" onClick={() => window.open(link[attrMap.url.key], '_blank')}>
                {link[attrMap.name.key]}
            </Link>
        </div>
    )
}
