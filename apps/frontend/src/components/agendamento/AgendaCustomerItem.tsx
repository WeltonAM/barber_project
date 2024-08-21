import { Agendamento, AgendaUtils, DataUtils } from '@barber/core'
import {
    IconCalendar, IconTrash, IconUser, IconScissors
} from '@tabler/icons-react'

export interface AgendaProfissionalItemProps {
    agendamento: Agendamento
    excluir: (id: number) => void
}

export default function AgendaCustomerItem(props: AgendaProfissionalItemProps) {
    const { agendamento } = props

    return (
        <div className="flex items-center gap-6 max-sm:gap-4 bg-zinc-800 rounded-md p-7 max-sm:p-4">
            <div className="flex-1 flex flex-col max-sm:gap-1">
                <span className="text-xl max-sm:text-base flex gap-2 items-center">
                    <IconScissors size={16} />
                    {agendamento.servicos[0].nome}{agendamento.servicos.length > 1 && ',...'}
                </span>

                <span className="text-zinc-400 text-sm max-sm:text-xs flex gap-2 items-center">
                    <IconUser size={16} />
                    {agendamento.profissional.nome}
                </span>
                <span className="text-zinc-400 text-sm max-sm:text-xs flex gap-2 sm:items-center">
                    <IconCalendar size={23} stroke={1} className='sm:hidden' />
                    <IconCalendar size={16} stroke={1} className='max-sm:hidden' />
                    {DataUtils.formatarDataEHora(new Date(agendamento.data))}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl max-sm:text-base font-black">
                </span>
                <span className="text-xl max-sm:text-base font-black">
                    {AgendaUtils.duracaoTotal(agendamento.servicos)}
                </span>
                <span className="text-zinc-400">
                    R$ {agendamento.servicos.reduce((acc, servico) => acc + servico.preco, 0)}
                </span>
            </div>
            <div>
                <button className="button bg-red-500" onClick={() => props.excluir(agendamento.id)}>
                    <IconTrash size={24} stroke={1.5} />
                </button>
            </div>
        </div>
    )
}