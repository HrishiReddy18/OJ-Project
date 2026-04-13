import ProblemStatement from "../Problem/ProblemStatement/ProblemStatement";
import { ProblemsProvider } from "../shared/problemsContext";
import Problems from "./components/Problems/Problems";

export const routes = [
  {
    path: "",
    element: (
      <ProblemsProvider>
        <Problems />
      </ProblemsProvider>
    ),
  },
  {
    path: "problem/:id",
    element: (
      <ProblemsProvider>
        <ProblemStatement />
      </ProblemsProvider>
    ),
  },
];
