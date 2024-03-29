'use client'
import {useEffect} from "react";
import {useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import GlobalLoader from "@/ui/loaders/GlobalLoader/GlobalLoader";

export default function Home() {
  const isAuth = useAppSelector(state => state.userReducer.isAuth);
  const router = useRouter();
  useEffect(() => {
    if(isAuth) router.push('/chats');
    else router.push('/login');
  }, []);
  return <GlobalLoader/>;
}
