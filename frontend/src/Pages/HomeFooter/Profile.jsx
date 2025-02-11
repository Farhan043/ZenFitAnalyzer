import Name from '../../Components/Profile/Name';
import { ThemeProvider } from '../../Context/ThemeContext';
import UserContext from '../../Context/UserContext';

const App = () => (
  <ThemeProvider>
  <UserContext>
    <Name />
    </UserContext>
    </ThemeProvider>
);

export default App;
