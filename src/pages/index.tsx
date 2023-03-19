import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useSession } from 'next-auth/react'


export default function Home() {
  const { data: session } = useSession()

  console.log({session})
  return (
    <>
      <Head>
        <title>Sis Rbx</title>
        <meta name="description" content="Sistema gestão de vendas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <main>

     <pre>{session && JSON.stringify(session, null, 2)}</pre>
     </main>
    </>
  )
}
