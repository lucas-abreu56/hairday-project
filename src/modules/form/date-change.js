import { scheduleDay } from "../schedules/load"

//Seleciona o input de date
const selectDate = document.getElementById("date");

//Recarrega a lista de hrários quando o input de data alterar
selectDate.onchange = () => scheduleDay();