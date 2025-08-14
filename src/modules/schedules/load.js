import { hoursLoad } from "../form/hours.load.js";

const selectedDate = document.getElementById('date');
export function scheduleDay(){
    //Obtém a data do input
    const date = selectedDate.value;

    // Renderiza as horas disponíveis
    hoursLoad({ date });
    // os horários disponíveis (horário futuro + não agendado) e indisponíveis
}