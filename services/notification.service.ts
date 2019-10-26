import {toastPush} from '~/plugins/ToastPush';

class NotificationService {

    public Success(msj: string) {

        toastPush.create({
            text: msj,
            type: "success",
            icon: 'check',
        });

    }

    public Error(msj: string) {
        toastPush.create({
            text: msj,
            type: "danger",
            icon: 'report_problem',
        });
    }

    public Warning(msj: string) {
        toastPush.create({
            text: msj,
            type: "warning",
            icon: 'warning',
        });
    }

    public Info(msj: string) {
        toastPush.create({
            text: msj,
            type: "info",
            icon: 'info',
        });
    }

    public savedSuccessfully() {
        toastPush.create({
            text: 'El registro se ha creado correctamente',
            type: "info",
            icon: 'info',
        });
    }

    public successfulUpdate() {
        toastPush.create({
            text: 'El registro se ha actualizado correctamente',
            type: "info",
            icon: 'info',
        });
    }

    public savedFailed() {
        toastPush.create({
            text: 'Ha ocurrido un error mientras guardaba',
            type: "warning",
            icon: 'warning',
        });
    }

}

export const notificationService = new NotificationService();
