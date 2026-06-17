import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import Livestock from "./pages/Livestock";
import FooterSection from "./components/sections/FooterSection";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/market"} component={Market} />
      <Route path={"/tools"} component={Tools} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/livestock"} component={Livestock} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Navbar />
          <Router />
          <FooterSection />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
