import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import lazy  from '@loadable/component'
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
