import { Play } from 'phosphor-react';
import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmoutInput, 
  Separator, 
  StartCountdownButton, 
  TaskInput } from './styles';

export function Home() {
  return ( 
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput id="task" list="task-suggestions" type="text" placeholder='Dê um nome para o seu projeto' />
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

      <StartCountdownButton type="submit">
        <Play size={24} />
        Começar
      </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}