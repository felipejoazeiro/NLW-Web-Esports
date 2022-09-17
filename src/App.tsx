import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'  //Utilizado na criação do modal. Redix vem com diversas funcionalidades. (Estudar biblioteca)

import { GameBanner } from './components/GameBanner'

import './styles/main.css'
import logo from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner'
import { GameController } from 'phosphor-react'
import { Input } from './components/Form/Input'

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
    fetch('http://localhost:3333/games').then(res=>res.json()).then(data=>{
      setGames(data)

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
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed '/>
          <Dialog.Content  className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 '>
            <Dialog.Title className='text-3xl font-black'>
              Publique um Anúncio
            </Dialog.Title>
            <form action="" className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <Input id="game" placeholder='Selecione o game que deseja jogar' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Seu nome (ou nickname)</label>
                <Input type="text" id="name" placeholder='Como te chamam dentro do jogo?'/>
              </div>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input type="text" id="yearsPlaying" placeholder='Tudo bem ser ZERO' /></div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual o seu discord</label>
                  <Input type="text" id="discord" placeholder='Usuario#0000' />
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando custuma jogar</label>
                  <div className='grid grid-cols-4 gap-2'>
                    <button className='w-8 h-8 rounded bg-zinc-900' title="Domingo">D</button>
                    <button className='w-8 h-8 rounded bg-zinc-900' title="Segunda">S</button>
                    <button className='w-8 h-8 rounded bg-zinc-900' title="Terça">T</button>
                    <button className='w-8 h-8 rounded bg-zinc-900' title="Quarta">Q</button>
                    <button className='w-8 h-8 rounded bg-zinc-900' title="Quinta">Q</button>
                    <button className='w-8 h-8 rounded bg-zinc-900' title="Sexta">S</button>
                    <button className='w-8 h-8 rounded bg-zinc-900' title="Domingo">S</button>

                  </div>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual o horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" id="hourStart" placeholder='De'/>
                    <Input type="time" id='hourEnd' placeholder='Até' />
                  </div>
                </div>
              </div>
              <div className='mt-2 flex gap-2 text-sm'>
                <Input type="checkbox" />
                Customo me conectar ao chat de voz
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                <button type='submit' className='bg-violet-500  px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
                  <GameController className='w-6 h-6'/>
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      

    </div>

  )
}

export default App
