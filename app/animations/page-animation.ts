import { AnimationController, Animation } from '@ionic/angular';

export const pageAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const DURATION = 800;
    const animationController = new AnimationController();

    if (opts.direction === 'forward') {
        return animationController.create()
        .addElement(opts.enteringEl)
        .duration(DURATION)
        .easing('ease-in')
        .fromTo('opacity', 0, 1);
    } else {
        return null;
    }
}