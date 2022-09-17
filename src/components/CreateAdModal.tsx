import { Check, GameController } from 'phosphor-react'
import * as Dialog from "@radix-ui/react-dialog"
import { Input } from "./Form/Input"
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState, FormEvent } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

 // Utilizar o select do radix

 interface Game{             //Indicando os tipos de dados que estão sendo recebidos pelo servidor
    id: string;
    title: string;
  }

export function CreateAdModal(){
    const[games,setGames] = useState<Game[]>([])
    const[weekDays, setWeekDays] = useState<string[]>(['0'])
    const[useVoiceChannel, setUseVoiceChannel] = useState(false)



    useEffect(()=>{
        axios('http://localhost:3333/games').then(res=>{
        setGames(res.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent){
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        console.log(data)
        console.log(useVoiceChannel)

        if(!data.name){
            return
        }

        try{
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                "name": data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "weekDays": weekDays.map(Number),
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd,
                "useVoiceChannel": useVoiceChannel
            })
            alert('Anúncio criado com sucesso!')
        }catch(err){
            alert('Erro ao criar o anúncio!')
            console.log(err)
        }
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed '/>
          <Dialog.Content  className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 '>
            <Dialog.Title className='text-3xl font-black'>
              Publique um Anúncio
            </Dialog.Title>
            <form action="" onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <select 
                    name="game"
                    id="game" 
                    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                    defaultValue=""
                >
                    <option value="" disabled>Selecione o game que deseja jogar</option>
                    {games.map(game=>{
                        return(
                            <option key={game.id} value={game.id}>{game.title}</option>
                        )
                    })}
                </select>  
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="">Seu nome (ou nickname)</label>
                <Input type="text" name="name" id="name" placeholder='Como te chamam dentro do jogo?'/>
              </div>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input type="text" name='yearsPlaying' id="yearsPlaying" placeholder='Tudo bem ser ZERO' /></div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual o seu discord</label>
                  <Input type="text" name='discord' id="discord" placeholder='Usuario#0000' />
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando custuma jogar</label>
                    <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} value={weekDays}>
                        <ToggleGroup.Item value="0" className={`${weekDays.includes('0')?'bg-violet-500':" bg-zinc-900 " } w-8 h-8 rounded`} title="Domingo">D</ToggleGroup.Item>
                        <ToggleGroup.Item value="1" className={`${weekDays.includes('1')?'bg-violet-500':" bg-zinc-900 " } w-8 h-8 rounded`} title="Segunda">S</ToggleGroup.Item>
                        <ToggleGroup.Item value="2" className={`${weekDays.includes('2')?'bg-violet-500':" bg-zinc-900 " } w-8 h-8 rounded`} title="Terça">T</ToggleGroup.Item>
                        <ToggleGroup.Item value="3" className={`${weekDays.includes('3')?'bg-violet-500':" bg-zinc-900 " } w-8 h-8 rounded`} title="Quarta">Q</ToggleGroup.Item>
                        <ToggleGroup.Item value="4" className={`${weekDays.includes('4')?'bg-violet-500':" bg-zinc-900 " } w-8 h-8 rounded`} title="Quinta">Q</ToggleGroup.Item>
                        <ToggleGroup.Item value="5" className={`${weekDays.includes('5')?'bg-violet-500':" bg-zinc-900 " } w-8 h-8 rounded`} title="Sexta">S</ToggleGroup.Item>
                        <ToggleGroup.Item value="6" className={`${weekDays.includes('6')?'bg-violet-500':" bg-zinc-900 " } w-8 h-8 rounded`} title="Domingo">S</ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual o horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" name="hourStart" id="hourStart" placeholder='De'/>
                    <Input type="time" name="hourEnd" id='hourEnd' placeholder='Até' />
                  </div>
                </div>
              </div>
              <label className='mt-2 flex items-center gap-2 text-sm'>
                <Checkbox.Root 
                checked={useVoiceChannel}
                onCheckedChange={(checked)=> {
                    if(checked === true){
                        setUseVoiceChannel(true)
                    }else{
                        setUseVoiceChannel(false)
                    }
                }} className='  p-1 w-6 h-6 rounded bg-zinc-900'>
                    <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-400' />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Customo me conectar ao chat de voz
              </label>

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
    )
}