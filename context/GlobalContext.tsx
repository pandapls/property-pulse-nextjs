'use client';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface GlobalContextType {
	unreadCount: number;
	setUnreadCount: (value: number | ((prevCount: number) => number)) => void;
}
interface GlobalProviderProps {
	children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType>({
	unreadCount: 0,
	setUnreadCount: () => { }
});
export function GlobalProvider({ children }: GlobalProviderProps) {
	const [unreadCount, setUnreadCount] = useState(0);
	const { data: session } = useSession();

	useEffect(() => {
		if (session && session.user) {
			getUnreadMessageCount().then((res) => {
				if (res.count) {
					setUnreadCount(res.count);
				}
			});
		}

	}, [session])

	return (
		<GlobalContext.Provider
			value={{
				unreadCount,
				setUnreadCount,
			}}
		>{children}</GlobalContext.Provider>
	);
}


export function useGlobalContext() {
	return useContext(GlobalContext);
}