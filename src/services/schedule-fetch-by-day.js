import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function scheduleFetchByDay({date}){
    try{
        //Faz a requisição
        const response = await fetch(`${apiConfig.baseURL}/schedules`);
        console.log(response);
        
        //Converte para JSON.
        const data = await response.json();
        console.log(data)

        //Filtra os agendamentos pelo dia selecionado
        const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"));
        console.log(dailySchedules)

        return dailySchedules;

    } catch(error){
        alert("Não foi possível buscar os agendamentos do dia selecionado");
    }
}