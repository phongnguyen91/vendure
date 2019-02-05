import { Sequencer } from './sequencer';
import { TerminalTyper } from './terminal-typer';

// tslint:disable-next-line
require('../../styles/intro/intro.scss');

const textArea = document.querySelector('.vendure-intro .intro-text-area');
const scene = document.querySelector('.vendure-intro .scene');
const controls = document.querySelector('.vendure-intro .intro-controls');
const title = document.querySelector('.vendure-intro .intro-title');

if (textArea && scene && controls && title) {
    const replayButton = controls.querySelector('#replay');
    const terminalCommands = `$ install @vendure/core\n` +
        `$ vendure init\n` +
        `$ start\n`;
    const terminal = new TerminalTyper(textArea as HTMLDivElement, terminalCommands);
    const onTransition = (className: string) => {
        controls.querySelectorAll('button').forEach(button => button.classList.remove('active'));
        const active = controls.querySelector(`#${className}-button`);
        if (active) {
            active.classList.add('active');
        }
        if (className === 'scene-6') {
            title.classList.add('visible');
            if (replayButton) {
                replayButton.classList.add('visible');
            }
        }
    };
    const sequencer = new Sequencer(scene as HTMLDivElement, terminal, onTransition);

    sequencer.play();


    if (replayButton) {
        replayButton.addEventListener('click', () => sequencer.play());
    }

    controls.addEventListener('click', event => {
        const target = event.target as HTMLButtonElement;
        const command = target.id;
        if (command) {
            switch (command) {
                case 'replay':
                    sequencer.play();
                    break;
                case 'scene-0-button':
                    sequencer.jumpTo(0);
                    break;
                case 'scene-1-button':
                    sequencer.jumpTo(1);
                    break;
                case 'scene-2-button':
                    sequencer.jumpTo(2);
                    break;
                case 'scene-3-button':
                    sequencer.jumpTo(3);
                    break;
                case 'scene-4-button':
                    sequencer.jumpTo(4);
                    break;
                case 'scene-5-button':
                    sequencer.jumpTo(5);
                    break;
                case 'scene-6-button':
                    sequencer.jumpTo(6);
                    break;
                default:
                    sequencer.jumpTo(0);
            }
        }
    });
}