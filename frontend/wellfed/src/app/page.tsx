import Calendar from './components/EventCalender/Calender';
import EditEvent from './components/EditEvent/EditEvent';

const Home: React.FC = () => {
  return (
    <div className="w-full">

      {/* Edit Event Component */}
      <div>
        <EditEvent /> 
      </div>
    </div>
  );
};

export default Home;
