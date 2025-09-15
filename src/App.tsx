import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/Layout";
import { AppRoutes } from "./routes";

// Create a query client for React Query
const queryClient = new QueryClient();

// Fallback component for ErrorBoundary, typed
const ErrorHandler = ({ error }: FallbackProps) => (
  <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
    <h2 className="text-xl font-bold">Something went wrong!</h2>
    <p>{error.message}</p>
  </div>
);

const App = (): ReactNode => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <ErrorBoundary FallbackComponent={ErrorHandler}>
              <AppRoutes />
            </ErrorBoundary>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;