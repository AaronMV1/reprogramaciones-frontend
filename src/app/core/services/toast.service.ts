import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  life: number = 6000;

  constructor(private messageService: MessageService) { }

  static get ToastType() {
    return {
      success: 'success',
      info: 'info',
      warn: 'warn',
      error: 'error',
    };
  }

  /**
   * Crea un toast de tipo success
   * @param mensaje Mensaje del toast
   * @param titulo Título del toast
   */
  success(mensaje: string = '', titulo: string = '') {
    this.toast(ToastService.ToastType.success, mensaje, titulo);
  }

  /**
   * Crea un toast de tipo info
   * @param mensaje Mensaje del toast
   * @param titulo Título del toast
   */
  info(mensaje: string = '', titulo: string = '') {
    this.toast(ToastService.ToastType.info, mensaje, titulo);
  }

  /**
   * Crea un toast de tipo warn
   * @param mensaje Mensaje del toast
   * @param titulo Título del toast
   */
  warn(mensaje: string = '', titulo: string = '') {
    this.toast(ToastService.ToastType.warn, mensaje, titulo);
  }

  /**
   * Crea un toast de tipo error
   * @param mensaje Mensaje del toast
   * @param titulo Título del toast
   */
  error(mensaje: string = '', titulo: string = '') {
    this.toast(ToastService.ToastType.error, mensaje, titulo);
  }

  /**
  * 
  * @param type Tipo de toast: ToastType(success, info, warn, error)
  * @param mensaje Mensaje del toast
  * @param titulo Título del toast
  */
  toast(type: any, mensaje: string = '', titulo: string = '') {
    this.messageService.add({
      key: 'global-toast',
      severity: type,
      summary: titulo,
      detail: mensaje,
      life: this.life,
    });
  }
}
