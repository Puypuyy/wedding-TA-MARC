import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { VM } from '../VM';

import { Index as ToolCategories } from '../../__personal/components/toolcategories/Index';
import { RenderAPI } from '../../__personal/components/global/RenderAPI';
import { Switching } from '../../__personal/components/swtiching/Index'
import { Settings } from '../../__personal/components/settings/Index';

let view = VM()
let Home
let Navigation
let Direct
switch (view) {
    case '':
        Navigation = lazy(() => import(`../../__personal/components/layouts/navigations/Index`))
        Home = lazy(() => import (`../../__personal/components/home/Index`))
        Direct = lazy(() => import (`../../__personal/components/direct/Index`))
        break;
    case '/devices/tablet':
        Navigation = lazy(() => import(`../../__personal/components/layouts/navigations/devices/tablet/Index`))
        Home = lazy(() => import (`../../__personal/components/home/devices/tablet/Index`))
        Direct = lazy(() => import (`../../__personal/components/home/devices/tablet/Index`))
        break;
    default:
        Navigation = lazy(() => import(`../../__personal/components/layouts/navigations/devices/mobile/Index`))
        Home = lazy(() => import (`../../__personal/components/home/devices/mobile/Index`))
        Direct = lazy(() => import (`../../__personal/components/home/devices/mobile/Index`))
        break;
}

export const WebRoute = () => {
    const location = useLocation().pathname;
    
    return (
        <Routes>
            <Route exact path="/psl" element={Render(Direct, location)}/>
            <Route exact path="/psl/switching/:params" element={<Switching/>} />
            <Route exact path="/psl/more" element={Render(Settings, location)} />
            <Route exact path="/psl/tool-categories/:params" element={Render(ToolCategories, location)} />
        </Routes>
    )
}

const Render = (Components, location) => (
    <>
        {view === '' ? (
            <Box width="100%" height="100%">
                <Box width="100%" height="100%" display="flex">
                    <Box height="100%">
                        {(location !== '/psl/profiling') && (<Navigation side={1} />)}
                    </Box>
                    <Box display="flex" flexDirection="column" width="100%" height="100%">
                        <Navigation side={0} />
                        <Box height="100%" className="overflowY noScrollcss">
                            <Components />
                        </Box>
                    </Box>
                </Box>
            </Box>
        ) : (
            <Box width="100%" height="100%">
                <Box width="100%" height="100%" display="flex" flexDirection="column">
                    {(location !== '/psl/profiling' && location !== '/psl/more') && (
                        <Box minHeight={location === '/psl' ? '92px' : '40px'}>
                            <Navigation side={0} />
                        </Box>
                    )}
                    <Box height="100%" width="100%" className="overflowY noScrollcss"><Components /></Box>
                    {(location !== '/profile' && location !== '/psl/profiling') &&
                        <Box minHeight="54px">
                            <Navigation side={2} />
                        </Box>
                    } 
                </Box>
            </Box>
        )}
        <RenderAPI/>
    </>
)