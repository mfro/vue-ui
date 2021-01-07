import 'ress';
import './framework.scss';

import { Plugin } from 'vue';

import app from './app.vue';
import button from './button.vue';
import card from './card.vue';
import dialog from './dialog.vue';
import flex from './flex.vue';
import grow from './grow.vue';
import icon from './icon.vue';
import textField from './text-field.vue';
import text from './text.vue';
import tooltip from './tooltip.vue';

const components = [
    app,
    button,
    card,
    dialog,
    flex,
    grow,
    icon,
    textField,
    text,
    tooltip,
];

export const framework: Plugin = (app, options) => {
    for (let def of components) {
        app.component(def.name!, def);
    }

    app.directive('ripple', {
        mounted(el, binding) {
            if (binding.value === false) return;

            el.style.position = 'relative';
            el.addEventListener('mousedown', start);
            el.addEventListener('mouseup', finish);
            el.addEventListener('mouseleave', finish);

            let container: HTMLDivElement | undefined;

            function start(e: MouseEvent) {
                finish();

                let box = el.getBoundingClientRect();

                let x = e.clientX - box.left, y = e.clientY - box.top;

                let corner = [
                    (x < box.width / 2) ? box.width : 0,
                    (y < box.height / 2) ? box.height : 0,
                ];

                let dx = corner[0] - x;
                let dy = corner[1] - y;

                let radius = Math.sqrt(dx * dx + dy * dy);
                radius = Math.min(radius, 160);

                container = document.createElement('div');
                container.className = `ripple`;
                let inner = document.createElement('div');
                inner.style.top = `${y}px`;
                inner.style.left = `${x}px`;
                inner.style.width = `${2 * radius}px`;
                inner.style.height = `${2 * radius}px`;

                container.appendChild(inner);
                el.appendChild(container);
            }

            function finish() {
                if (!container) return;

                container.classList.add('finish');

                let local = container;
                local.addEventListener('animationend', e => {
                    if (e.animationName == 'ripple-finish')
                        el.removeChild(local);
                })

                container = undefined;
            }
        },
    });
};
