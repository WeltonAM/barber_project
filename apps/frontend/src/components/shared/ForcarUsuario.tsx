'use client'
import { usePathname, useRouter } from 'next/navigation'
import useUsuario from '@/data/hooks/useUsuario'
import Processando from './Processando'

export default function ForcarUsuario(props: any) {
    const { carregando, usuario } = useUsuario()
    const caminho = usePathname()
    const router = useRouter()

    function redirecionarPara(url: string) {
        router.push(url)
        return <Processando />
    }

    if (!usuario?.email && carregando) return <Processando />
    if (!usuario?.email) return redirecionarPara(`/entrar?destino=${caminho}`)

    return props.children
}
