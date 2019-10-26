
class ToastPush {
    public idToast: number = 0;
    public content: HTMLElement | any;
    public toastContent: HTMLElement | any;
    public e: any;

    constructor() {
        //this.content = window ? document.createElement('div') : '';
        //this.content.id = 'toast';
        //document.body.appendChild(this.content);
    }

   public create(e: any) {
        this.e = e;
        this.toastContent = document.createElement('div');
        ++this.idToast;
        const idtoast = 'toast-' + this.idToast;
        this.toastContent.id = idtoast;

        if (e.animationIn) {
            this.toastContent.className = 'toast-content animated ' + e.animationIn;
        } else {
            this.toastContent.className = 'toast-content animated fadeInDown';
        }

        const container = document.createElement('div');
        container.className = 'toast-container';
        this.toastContent.appendChild(container);
        if (e.image) {
            const spanImg = document.createElement('span');
            spanImg.className = 'toast-image';
            container.appendChild(spanImg);

            const img = document.createElement('img');
            img.src = e.image;
            img.className = 'toast-image-src';
            spanImg.appendChild(img);
            if (e.important) {
                const importanImg = document.createElement('i');
                importanImg.className = 'important';
                spanImg.appendChild(importanImg);
            }
        }

        if (e.icon) {
            const spanIcon = document.createElement('span');
            spanIcon.className = 'toast-icon';
            container.appendChild(spanIcon);
            const iTag = document.createElement('i');
            iTag.className = 'material-icons';
            iTag.innerHTML = e.icon;
            spanIcon.appendChild(iTag);
            if (e.important) {
                const importanIcon = document.createElement('i');
                importanIcon.className = 'important';
                spanIcon.appendChild(importanIcon);
            }
        }

        const spanText = document.createElement('span');
        spanText.className = 'toast-text';
        e.text ? spanText.innerHTML = e.text : spanText.innerHTML = '¡Hola!';
        container.appendChild(spanText);

        if ('function' === typeof e.callbackOk || 'function' === typeof e.callbackCancel) {
            const spanAction = document.createElement('span');
            spanAction.className = 'toast-actions';
            container.appendChild(spanAction);
            if ('function' === typeof e.callbackOk) {
                const p = document.createElement('span');
                e.buttonOk ? p.innerHTML = e.buttonOk : p.innerHTML = 'OK';
                p.className = 'toast-action-btn';
                spanAction.appendChild(p);
                p.addEventListener('click', () => {
                    // a.stopPropagation();
                    e.callbackOk.call(this.close(idtoast));
                });
            }
            if ('function' === typeof e.callbackCancel) {
                const u = document.createElement('span');
                e.buttonCancel ? u.innerHTML = e.buttonCancel : u.innerHTML = 'No, gracias';
                u.className = 'toast-action-btn';
                spanAction.appendChild(u);
                u.addEventListener('click', () => {
                    // a.stopPropagation();
                    e.callbackCancel.call(this.close(idtoast));
                });
            }
        }

        const divClose = document.createElement('div');
        divClose.className = 'toast-close';
        container.appendChild(divClose);
        const divCloseIcon = document.createElement('div');


        // @ts-ignore
        // @ts-ignore
        divCloseIcon.className = 'toast-close-icon';
        divClose.appendChild(divCloseIcon);
        divClose.addEventListener('click', () => {
            // e.stopPropagation();
            this.close(idtoast);
        });

        // @ts-ignore
        /* tslint:disable */
        if ('function' === typeof e.callbackOk || 'function' === typeof e.callbackCancel) {

        } else if (e.duration) {
            window.setTimeout(() => {
                this.close(idtoast);
            }, e.duration);
        } else {
            window.setTimeout(() => {
                this.close(idtoast);
            }, 3000);
        }


        if (e.rounded) {
            this.toastContent.className += ' rounded';
        }
        if (e.type) {
            this.toastContent.className += ' toastnotify-' + e.type;
        } else {
            this.toastContent.className += ' toastnotify-default';
        }
        if (e.classes) {
            this.toastContent.className += ' ' + e.classes;
        }
        // @ts-ignore
        document.getElementById('toast').appendChild(this.toastContent);
        return this.toastContent;
    }

    public close(idtoast: string, duration: number = 1e3) {
        const toastContent: any = document.getElementById(idtoast);
        if (this.e.animationIn) {
            toastContent.classList.remove(this.e.animationIn);
        } else {
            toastContent.classList.remove('fadeInLeft');
        }

        if (this.e.animationOut) {
            toastContent.classList.add(this.e.animationOut);
        } else {
            toastContent.classList.add('fadeOutLeft');
        }

        window.setTimeout(() => {
            // console.log('removiendo')
            toastContent.remove();
        }, duration);
    }

}

export const toastPush = new ToastPush();
