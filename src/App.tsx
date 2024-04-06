import { Route, Routes } from 'react-router-dom'

import CompactCalendar from './pages/CompactCalendar'

function App() {

  return (
    <>
      <Routes>
        <Route path="/calendar-generator">
          <Route path="compact" element={<CompactCalendar />} />
          <Route path="full" element={<div>Pretty Printable Calendar</div>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
