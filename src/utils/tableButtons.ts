import { h, withDirectives } from 'vue'

export const editTableButton = (onClick: () => void) => {
    return withDirectives(
        h('div', { class: 'tooltip', 'data-tip': 'Editar' }, [
            h(
                'button',
                {
                    class: 'btn btn-outline btn-primary action-btn-table',
                    onClick
                },
                [h('span', { class: 'material-symbols-outlined' }, 'edit_square')]
            )
        ]),
        []
    )
}

export const deleteTableButton = (onClick: () => void) => {
    return withDirectives(
        h(
            'div',
            {
                class: 'tooltip',
                'data-tip': 'Eliminar'
            },
            [
                h(
                    'button',
                    {
                        class: 'btn btn-outline btn-error action-btn-table',
                        onClick
                    },
                    [h('span', { class: 'material-symbols-outlined' }, 'delete')]
                )
            ]
        ),
        []
    )
}
