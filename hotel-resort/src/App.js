import { Header } from "./components/header/header";
import { Hotels } from "./components/hotels/hotels";
import { Footer } from "./components/footer/footer";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Hotels />
      <Footer />
    </div>
  );
}

export default App;
