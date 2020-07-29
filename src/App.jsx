import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import lazy  from '@loadable/component'
import "./common/tailwindGlobal.css"
const Index = lazy(() => import('./view/Index'))

function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Index />
            </Suspense>
        </div>
    )
}

export default hot(App);
