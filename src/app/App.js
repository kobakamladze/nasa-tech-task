import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";

import Footer from "../components/footer/footer.component";
import Header from "../components/header/header.component";
import MainPage from "../pages/main.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <main>
          <MainPage />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
