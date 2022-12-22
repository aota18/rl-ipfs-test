import { useStateMachine } from "little-state-machine";
import { Route, Routes } from "react-router-dom";
import CardDetails from "./GreetingCard/CardDetails";
import Confirmation from "./GreetingCard/Confirmation";
import Preview from "./GreetingCard/Preview";

const GreetingCard = () => {
  const { actions } = useStateMachine({});

  return (
    <>
      <Routes>
        {/* <nav>
            <ul className="flex space-x-2">
              <li>
                <Link to={`?step=1`}>Event</Link>
              </li>
              <li>
                <Link to={`/memories?step=2`}>Memory</Link>
              </li>
              <li>
                <Link to={`/ticket-nft-details?step=3`}>NFT</Link>
              </li>
              <li>
                <Link to={`/sbt-details?step=4`}>SBT</Link>
              </li>
  
              <li>
                <Link to={`/preview?step=5`}>Preview</Link>
              </li>
            </ul>
          </nav> */}
        <Route exact path={`/`} element={<CardDetails />} />
        <Route path={`/preview`} element={<Preview />} />
        <Route path={`/confirmation`} element={<Confirmation />} />
      </Routes>
    </>
  );
};

export default GreetingCard;
