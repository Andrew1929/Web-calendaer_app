import { Routes, Route, Navigate} from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { CalendarPage } from './pages/calendarPage';

export const appRouter = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/calendar' element={<CalendarPage/>} />
            <Route path="*" element={<Navigate to='/login' />} />
        </Routes>
    )
}