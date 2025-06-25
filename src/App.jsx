import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";

import ViewJob from "./pages/ViewJob";
import AddNewJob from "./pages/addNewJob";

/**
 * App component is the root of the application.
 * It renders the main layout including the Header and configures routing
 * for different pages such as Homepage, AddNewJob, ViewJob, and EditJob.
 *
 * Routes:
 * - "/" => Homepage
 * - "/addJob" => AddNewJob (create job)
 * - "/job/:id" => ViewJob (view job details)
 * - "/editJob/:id" => AddNewJob (edit job)
 *
 * @returns {JSX.Element} The main app layout with navigation and routed page views.
 */

function App() {
  return (
    <div className="flex flex-col min-h-screen  overflow-y-hidden">
      <Header />
      <div className="px-4 py-3 flex scrollable-section h-[calc(100vh-8vh)]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/addJob" element={<AddNewJob />} />
          <Route path="/job/:id" element={<ViewJob />} />
          <Route path="/editJob/:id" element={<AddNewJob />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
