import { scheduleDay } from "./load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";

const periods = document.querySelectorAll(".period")

//Gerar evento de click para cada lista
periods.forEach((period) => {
    //Captura o evento de clique na lista.
    period.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")){
            //Obtém a li pai do elemento clicado
            const item = event.target.closest("li");

            //Pega o id do agendamento para remover
            const { id } = item.dataset;

            //Confirma que o id foi selecionado
            if(id){
                //Confirma se o usuário quer excluir o agendamento
                const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")
                
                if(isConfirm){
                    //Faz a requisição para cancelar
                    await scheduleCancel({id});
    
                    //Recarrega os agendamentos
                    scheduleDay();
                }
            }
        }
    })
})