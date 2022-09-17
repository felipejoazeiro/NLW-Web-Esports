import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'  //Utilizado na criação do modal. Redix vem com diversas funcionalidades. (Estudar biblioteca)

import { GameBanner } from './components/GameBanner'

import logo from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner'

import { CreateAdModal } from './components/CreateAdModal'
import './styles/main.css'
import axios from 'axios'

interface Game{             //Indicando os tipos de dados que estão sendo recebidos pelo servidor
  id: string;
  title: string;
  bannerURL: string;
  _count:{
    ads: number;
  };
  key: string;
}

function App() {
  const[games,setGames] = useState<Game[]>([])

  useEffect(()=>{
    axios('http://localhost:3333/games').then(res=>{
      setGames(res.data)

    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img src={logo} alt="" />
      <h1 className="text-6xl text-white font-black mt20">
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui
      </h1>

    
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game=>{

          return(
            <GameBanner title={game.title} bannerUrl={game.bannerURL}  adsCount={game._count.ads} key={game.id}/>
            )
        })}
      </div>


      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
      

    </div>

  )
}

export default App
