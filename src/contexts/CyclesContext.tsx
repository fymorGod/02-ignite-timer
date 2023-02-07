import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string;
  minutesAmount: number
}

interface CyclesContextType { 
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondPassed: number
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider ({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer( cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {
    const storedStateAsJson = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
    
    if ( storedStateAsJson) {
      return JSON.parse(storedStateAsJson)
    }
  })
  const { cycles, activeCycleId} = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondPassed, setAmountSecondPassed] = useState(() => {
    if(activeCycle) {
      return differenceInSeconds(
        new Date(), 
        new Date(activeCycle.startDate)
      )
    }
    return 0
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson)

  }, [cyclesState])  


    
  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds);
  } 

  function markCurrentCycleAsFinished(){
    dispatch(markCurrentCycleAsFinishedAction())
  }

    //função para criar um ciclo no cronômetro
    function createNewCycle(data: CreateCycleData) {
      const id = String(new Date().getTime());
  
      const newCycle: Cycle = {
        id,
        task: data.task,
        minutosAmount: data.minutesAmount,
        startDate: new Date(),
      };

      dispatch(addNewCycleAction(newCycle))
      setAmountSecondPassed(0);
    }
  
    function interruptCurrentCycle() {
      dispatch(interruptCurrentCycleAction())
    }

  return (
    <CyclesContext.Provider 
    value={{ 
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondPassed, 
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
        }}
      >
        {children}
      </CyclesContext.Provider>
  );
}