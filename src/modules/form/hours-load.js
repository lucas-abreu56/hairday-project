import dayjs from 'dayjs';
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from './hours-click.js';

const hours = document.getElementById('hours');

export function hoursLoad(dateParam){
    // Limpa a lista de horários
    hours.innerHTML = ""

    // Extrair a data do objeto ou usar como string
    const dateString = typeof dateParam === 'object' ? dateParam.date : dateParam;

    // Obtém a data/hora atual
    const now = dayjs();
    
    // Converte a data selecionada para dayjs
    const selectedDate = dayjs(dateString);
    
    // Verifica se a conversão foi bem-sucedida
    if (!selectedDate.isValid()) {
        console.error('Data inválida:', dateString);
        return;
    }
    
    // Verifica se a data selecionada é hoje
    const isToday = selectedDate.isSame(now, 'day');

    const opening = openingHours.map((hour) => {
        // Recupera hora e minutos
        const [scheduleHour, scheduleMinute = '0'] = hour.split(':');
        
        // Cria o momento exato do horário de agendamento na data selecionada
        const scheduleDateTime = selectedDate
            .hour(parseInt(scheduleHour))
            .minute(parseInt(scheduleMinute))
            .second(0);
        
        // Determina se o horário está disponível
        let available = true;
        
        if (isToday) {
            // Se é hoje, verifica se o horário já passou (com margem de 30 minutos)
            const thirtyMinutesFromNow = now.add(30, 'minute');
            available = scheduleDateTime.isAfter(thirtyMinutesFromNow);
        } else if (selectedDate.isBefore(now, 'day')) {
            // Se é uma data anterior a hoje, não está disponível
            available = false;
        }
        // Se é uma data futura, todos os horários estão disponíveis

        return {
            hour,
            available,
        }
    })

    // Controle para evitar cabeçalhos duplicados
    let lastPeriod = '';

    // Renderiza as horas
    opening.forEach(({hour, available}) => {
        const li = document.createElement('li');
        li.classList.add('hour');
        li.classList.add(available ? 'hour-available' : 'hour-unavailable');
        li.textContent = hour;

        // Adiciona cabeçalhos de período apenas uma vez
        if(hour === "9:00" && lastPeriod !== "Manhã"){
            hourHeaderAdd("Manhã");
            lastPeriod = "Manhã";
        } else if (hour === "13:00" && lastPeriod !== "Tarde"){
            hourHeaderAdd("Tarde");
            lastPeriod = "Tarde";
        } else if (hour === "18:00" && lastPeriod !== "Noite"){
            hourHeaderAdd("Noite");
            lastPeriod = "Noite";
        }
        
        hours.appendChild(li);
    })

    // Adiciona o click nos horários disponíveis
    hoursClick();
}

function hourHeaderAdd(title){
    const header = document.createElement("li");
    header.classList.add("hour-period");
    header.textContent = title;

    hours.appendChild(header);
}