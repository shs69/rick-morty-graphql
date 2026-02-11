import { createContext, type ReactNode, useContext, useState } from "react";

type LastPageContextType = {
	lastPage: number;
	setLastPage: (page: number) => void;
};

const LastPageContext = createContext<LastPageContextType | undefined>(
	undefined,
);

export const LastPageProvider = ({ children }: { children: ReactNode }) => {
	const [lastPage, setLastPage] = useState(1);
	return (
		<LastPageContext.Provider value={{ lastPage, setLastPage }}>
			{children}
		</LastPageContext.Provider>
	);
};

export const useLastPage = () => {
	const context = useContext(LastPageContext);
	if (!context)
		throw new Error("useLastPage must be used within LastPageProvider");
	return context;
};
