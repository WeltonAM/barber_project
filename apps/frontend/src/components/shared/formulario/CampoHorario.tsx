'use client'
import { cn } from '@/lib/utils'
import { AgendaUtils, DateUtils, Horarios } from '@barber/core'
import { IconX } from '@tabler/icons-react'
import { useState } from 'react'

export interface CampoHorarioProps
    extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    label?: string
    value: Date
    qtdeHorarios: number
    horariosOcupados: string[]
    onChange: (value: Date) => void
}

export default function CampoHorario(props: CampoHorarioProps) {
    const [horarioHover, setHorarioHover] = useState<string | null>(null)
    const { manha, tardeNoite } = AgendaUtils.horariosDoDia()
    const { horariosOcupados } = props

    const horarioSelecionado = props.value.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    })

    function verificarHorarioPassado(horario: string): boolean {
        const agora = new Date();
        const dataSelecionada = props.value;

        const hoje = agora.toDateString() === dataSelecionada.toDateString();

        if (!hoje) {
            return false;
        }

        const [horaAtual, minutoAtual] = [agora.getHours(), agora.getMinutes()];
        const [hora, minuto] = horario.split(':').map(Number);

        return hora < horaAtual || (hora === horaAtual && minuto < minutoAtual);
    }


    function renderizarHorario(horario: string) {
        const horariosHover = new Horarios(horarioHover!, props.qtdeHorarios, horariosOcupados)
        const horariosSelecionados = new Horarios(
            horarioSelecionado,
            props.qtdeHorarios,
            horariosOcupados
        )
        const selecionado =
            horariosSelecionados.todos.includes(horario) && horariosSelecionados.completo
        const destaque = horariosHover.todos.includes(horario)
        const naoPodeSelecionar = destaque && (horariosHover.ocupado || horariosHover.incompleto)
        const horarioPassado = verificarHorarioPassado(horario)
        const exibirX = naoPodeSelecionar || horarioPassado || horariosOcupados.includes(horario)

        return (
            <div
                key={horario}
                className={cn('flex justify-center items-center rounded h-8 bg-zinc-800 cursor-pointer', {
                    'bg-green-500 text-white font-semibold': selecionado,
                    'bg-yellow-400 text-black font-semibold': destaque,
                    'bg-red-500 text-white font-semibold cursor-not-allowed': naoPodeSelecionar,
                    'bg-gray-500 text-white cursor-not-allowed': horarioPassado || horariosOcupados.includes(horario),
                })}
                onMouseEnter={() => setHorarioHover(horario)}
                onMouseLeave={() => setHorarioHover(null)}
                onClick={() => {
                    if (naoPodeSelecionar || horarioPassado) return
                    props.onChange(DateUtils.aplicarHorario(props.value, horario))
                }}
            >
                {exibirX ? <IconX size={18} /> : <span>{horario}</span>}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3 select-none">
            {props.label && (
                <span className="uppercase text-zinc-400 font-light">{props.label}</span>
            )}
            <div className="flex flex-col gap-3">
                <span className="uppercase text-zinc-400 font-light">Manhã</span>
                <div className="grid grid-cols-8 gap-1">{manha.map(renderizarHorario)}</div>

                <span className="uppercase text-zinc-400 font-light">Tarde & Noite</span>
                <div className="grid grid-cols-8 gap-1">{tardeNoite.map(renderizarHorario)}</div>
            </div>
        </div>
    )
}
