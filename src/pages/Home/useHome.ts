export type PageType = {
  setPage: (value: "list_view" | "form_view") => void;
};

type ParamsPage = {
  page: "list_view" | "form_view";
} & PageType;

export const useHome = () => {
  const handlePage = ({ page, setPage }: ParamsPage) => {
    if (page === "list_view") setPage("form_view");
    if (page === "form_view") setPage("list_view");
  };

  const getButtonText = (page: string): string => {
    if (page === "list_view") return "Add Task";
    if (page === "form_view") return "Go Back";
    return "";
  };

  return {
    handlePage,
    getButtonText,
  };
};
