import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmoutInput, 
  Separator, 
  StartCountdownButton, 
  TaskInput } from './styles';

export function Home() {

  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data) {
    console.log(data)
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return ( 
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
          id="task" 
          list="task-suggestions" 
          type="text" 
          placeholder='Dê um nome para o seu projeto'
          {...register('task')} 
          />
          <datalist id='task-suggestions'>
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmoutInput 
            id="minutosAmount" 
            type="number" 
            placeholder='00' 
            step={5} 
            min={5} 
            max={60} 
          {...register('minutesAmount', { valueAsNumber: true})} 
          />
          <span>minutos.</span>
        </FormContainer>

      <CountDownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountDownContainer>

      <StartCountdownButton disabled={isSubmitDisabled} type="submit">
        <Play size={24} />
        Começar
      </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}