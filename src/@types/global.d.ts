export {};

declare global {
  interface Window {
    /** widgetId retornado pelo render() do RecaptchaVerifier */
    recaptchaWidgetId?: number;

    /** objeto do reCAPTCHA v2 */
    grecaptcha?: {
      reset: (widgetId: number) => void;
    };
  }
}
